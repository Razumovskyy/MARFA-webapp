module LBL
    use Constants
    use Interfaces
    use Atmosphere
    use Grids
    use Spectroscopy
    use MolarMasses
    use Shapes
    use LineGridCalc
    
    implicit none
    
    integer, parameter :: databaseFileUnit = 7777
    
    real(kind=DP) :: startWV, endWV ! [cm-1] -- boundaries of an initial spectral interval [startWV; EndWV]
    real(kind=DP) :: extStartWV, extEndWV ! boundaries of an extended initial interval: [startWV-cutOff; endWV+cutOff]
    real(kind=DP) :: startDeltaWV, endDeltaWV ! boundaries of a subinterval ! VSTART (also: VS,VR4), VFINISH (legacy) !
    real(kind=DP) :: extStartDeltaWV ! legacy: VA
    real(kind=DP) :: extEndDeltaWV ! legacy: VFISH
    
    character(len=300) :: databaseFile ! file name with line spectral data

contains

    subroutine lblScheme(lineIdxParameter, capWVParameter)
        
        integer, intent(inout) :: lineIdxParameter ! integer line label used for locating record in direct access file
        real(kind=DP), intent(in) :: capWVParameter ! inout parameter for capWV. For definition see main.f90 file

        real(kind=DP) :: shiftedLineWV ! VI ! pressure-induced shifted line transition wavenumber

        ! techincal variables
        integer :: I ! loop variable for accessing the record in direct access file
        integer :: ios2

    !------------------------------------------------------------------------------------------------------------------!

        ! line-by-line loop: reading spectral data for the subinterval and performing summation
        I = lineIdxParameter - 1
        ios2 = 0
        LBL_LOOP: do while (.not. is_iostat_end(ios))
            I = I + 1
            read(databaseFileUnit, rec=I, iostat=ios2) lineWV, refLineIntensity, gammaForeign, gammaSelf, lineLowerState, & 
                                                    foreignTempCoeff, jointMolIso, deltaForeign
     
            ! DEBUG SECTION !
            ! write (*,*) 'lineWV: ', lineWV
            ! write (*,*) 'refLineIntensity: ', refLineIntensity
            
            if (ios2 > 0) then
                write (0, *) 'FileReadingError: when reading file with spectral data. File with spectral data may have &
                                inconsistent structure or there are no specrtral lines in the requested spectral interval.'
                stop 93
            end if

            ! exit the loop when extended subinterval (endDeltaWV + cutOff) ends
            ! extEndDeltaWV = endDeltaWV + cutOff
            if  (lineWV >= extEndDeltaWV) exit

            ! setting the lineIdxParameter for the next call -- for corrct switching to the next subinterval
            ! capWVParameter = endDeltaWV - cutOff, so capWVParameter < extEndDeltaWV
            if  (lineWV <= capWVParameter) lineIdxParameter = I

            ! Setting the molar weight
            isotopeNum = jointMolIso/100
            molarMass = WISO(isotopeNum)

            ! calculation of pressure-induced shift
            shiftedLineWV = shiftedLinePosition(lineWV, pressure)
            dopHWHM = dopplerHWHM(shiftedLineWV, temperature, molarMass)
            lorHWHM = lorentzHWHM(pressureParameter=pressure, partialPressureParameter=pSelf, &
                                    temperatureParameter=temperature)

            lineIntensity = intensityOfT(temperature)

            ! DEBUG SECTION !
            ! write (*,*) 'dopHWHM: ', dopHWHM
            ! write (*,*) 'lorHWHM: ', lorHWHM
            ! write (*,*) 'VY: ', lorHWHM * sqln2 /dopHWHM
            ! pause
            
            if (shiftedLineWV < startDeltaWV) then
                ! in this case current LBL_LOOP spectral line falls into the interval: 
                ! [startDeltaWV - cutOff; startDeltaWV] and to find its contribution 
                ! on the [startDeltaWV; endDeltaWV] interval, only RIGHT WING of this line
                ! must be accounted for. It is done in leftLBL subroutine:
                call leftLBL(startDeltaWV, shiftedLineWV, shapeFuncPtr, EPS)
            else if (shiftedLineWV > endDeltaWV) then
                ! in this case current LBL_LOOP spectral line falls into the interval: 
                ! [endDeltaWV; endDeltaWV + cutOff] and to find its contribution 
                ! on the [startDeltaWV; endDeltaWV] interval, only LEFT WING of this line
                ! must be accounted for. It is done in rightLBL subroutine:
                call rightLBL(startDeltaWV, shiftedLineWV, shapeFuncPtr, EPS)
            else
                ! in this case current LBL_LOOP spectral line falls into the subinterval itself
                ! BOTH WINGS of this line must be accounted for.
                ! It is implemented in the centerLBL subroutine:
                call centerLBL(startDeltaWV, shiftedLineWV, shapeFuncPtr, EPS)
            end if
        end do LBL_LOOP
    end subroutine lblScheme
end module LBL
