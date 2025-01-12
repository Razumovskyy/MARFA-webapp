module EnvironmentSetup
    use Constants
    use LBL
    use Atmosphere
    implicit none
    
    ! Input command line arguments and their trimmed values as strings !
    integer :: argc ! number of the passed command line arguments
    character(len=10) :: inputMolecule   
    character(len=20) :: databaseSlug
    character(len=10) :: startWVcla, endWVcla, startWVclaTrimmed, endWVclaTrimmed
    character(len=10) :: cutOffcla, cutOffclaTrimmed
    character(len=10) :: inputPressurecla, inputTemperaturecla, inputNumberDensityCla
    character(len=10) :: inputPressureClaTrimmed, inputTemperatureClaTrimmed, inputNumberDensityClaTrimmed
    real :: inputPressure, inputTemperature, inputNumberDenisty
    character(len=30) :: targetValue, targetValuecla
    character(len=10) :: uuid
    logical :: isVAC
    logical :: isUUID

    ! Parameters and variables for constructing directories names !
    character(len=200) :: rootDirName
    character(len=100) :: formattedStartWV, formattedEndWV
    character(len=200) :: parentDir
    character(len=300) :: fullSubDirPath
    character(len=300) :: infoFilePath
    character(len=300) :: latestRunFilePath
    integer, parameter :: infoUnit = 67
    integer, parameter :: latestRunUnit = 87
    integer :: status

contains


    subroutine readCommandLineArguments()
        implicit none
        integer :: l

        ! Get a number of command-line arguments
        argc = command_argument_count()

        isUUID = .false.
        isVAC = .false.

        ! Establishing input parameters based on command line arguments
        do l = 1, command_argument_count()

            select case (l)
            case (1)
                call get_command_argument(l, inputMolecule)
            case (2)
                call get_command_argument(l, startWVcla)
                startWVclaTrimmed = trim(startWVcla)
                read(startWVclaTrimmed, *) startWV
                if (startWV < 10. .or. startWV > 14000.) then
                    write(0, *) 'ValueError: StartWV must be greater than 10 and less than 14000'
                    stop 22
                end if
            case (3)
                call get_command_argument(l, endWVcla)
                endWVclaTrimmed = trim(endWVcla)
                read(endWVclaTrimmed, *) endWV
                if (endWV < 10. .or. endWV > 14000.) then
                    write(0, *) 'ValueError: EndWV must be greater than 10 and less than 14000'
                    stop 28
                end if
                if (endWV < startWV) then
                    write(0, *) 'ValueError: right boundary of the spectral interval must be greater than left one'
                end if
            case (4)
                call get_command_argument(l, databaseSlug)
            case (5)
                call get_command_argument(l, cutOffcla)
                cutOffclaTrimmed = trim(cutOffcla)
                read(cutOffclaTrimmed, *) cutOff
            case (6)
                call get_command_argument(l, inputPressurecla)
                inputPressureClaTrimmed = trim(inputPressurecla)
                read(inputPressureClaTrimmed, *) pressure
            case(7)
                call get_command_argument(l, inputTemperaturecla)
                inputTemperatureClaTrimmed = trim(inputTemperaturecla)
                read(inputTemperatureClaTrimmed, *) temperature
                if (temperature < 20. .or. temperature > 1000.) then
                    write(0, *) 'ValueError: Temperature must be greater than 20 and less than 1000 K'
                    stop 32
                end if
            case (8)
                call get_command_argument(l, targetValuecla)
                ! Set ACS or VAC with validation
                targetValue = trim(targetValuecla)
                select case (targetValue)
                case ('ACS')

                case ('VAC')
                    isVAC = .true.
                case default
                    write (0, *) 'ValueError: Invalid targetValue "', trim(targetValue), '". & 
                                Must be either "ACS" (Absorption cross-section) or &
                                "VAC" (Volume absorption coefficient).'
                    stop 24
                end select
            case(9)
                call get_command_argument(l, inputNumberDensityCla)
                inputNumberDensityClaTrimmed = trim(inputNumberDensityCla)
                if (isVAC) then
                    read(inputNumberDensityClaTrimmed, *) density
                else
                    density = 1.
                end if
            case (10)
                call get_command_argument(l, uuid)
                isUUID = .true.
            end select
        end do
        
        if (.not. isUUID) then
            write (0, *) 'CommandLineArgumentMissing: uuid positive integer must be provided'
            stop 65
        end if
    end subroutine readCommandLineArguments

    
    subroutine initialiseDirectories()
        implicit none

        rootDirName = ".." // "/" // "media" // "/" // "users" // "/" // trim(adjustl(uuid)) // "/" ! users/<uuid>/
        fullSubDirPath = trim(adjustl(rootDirName))  ! users/<uuid>/

    end subroutine initialiseDirectories
        

    subroutine initialiseLogFiles
        implicit none
        ! Establishing technical infoFile for storin information about the parameters of the run
        infoFilePath = trim(fullSubDirPath) // 'info.txt' ! users/<uui>/info.txt
        open(infoUnit, file=infoFilePath, status='replace', action='write', iostat=status)

        if (status /= 0) then
            write (0, *) "Error: Unable to create info file at ", trim(infoFilePath)
            stop 42
        end if

        ! Write command-line arguments to the info file
        select case (targetValue)
        case ('VAC')
            write(infoUnit, '(A,A)') 'Target value of calculation: ', 'Volume absorption coefficient (km^-1)'
        case ('ACS')
            write(infoUnit, '(A,A)') 'Target value of calculation: ', 'Absorption cross-section (cm^2)'
        end select
        write(infoUnit, '(A,A)') 'Request UUID: ', uuid
        write(infoUnit, '(A,A)') 'Input Molecule: ', trim(inputMolecule)
        write(infoUnit, '(A,A)') 'Start Wavenumber: ', trim(startWVclaTrimmed)
        write(infoUnit, '(A,A)') 'End Wavenumber: ', trim(endWVclaTrimmed)
        write(infoUnit, '(A,A)') 'Database: ', databaseSlug
        write(infoUnit, '(A,A)') 'Cut Off: ', trim(cutOffclaTrimmed)
        write(infoUnit, '(A,E12.5)') 'Pressure (atm): ', pressure
        write(infoUnit, '(A,F6.2)') 'Temperature (K): ', temperature
        write(infoUnit, '(A,E12.5)') 'Number density (cm^{-2}*km^{-1}): ', density
        close(infoUnit)
    end subroutine initialiseLogFiles


    subroutine readTIPS()
        implicit none
        character(len=300), parameter :: TIPSFile = 'data/QofT_formatted.dat' ! path to the file with TIPS data
        integer, parameter :: TIPSUnit = 5467 ! unit for file with TIPS data
        integer :: nIsotopes, nTemperatures ! number of different isotopes and temperatures in the TIPS file
        integer :: stSumTIdx, stSumIsoIdx  ! loop indices for partition sums: temperatures and isotopes
        ! This subroutine opens a file containing TIPS data, allocates an array for storage, 
        ! and populates the array with data in a loop
        open(unit=TIPSUnit, file='data/TIPS/TIPS.dat', status='old', action='read')
        read(TIPSUnit, *) nIsotopes, nTemperatures
        allocate(TIPS(nIsotopes, nTemperatures))
        do stSumIsoIdx = 1, nIsotopes
            read(TIPSUnit, *) (TIPS(stSumIsoIdx, stSumTIdx), stSumTIdx=1, nTemperatures)
        end do
        close(TIPSUnit)
    end subroutine readTIPS
    
    
    pure subroutine getSpeciesCode(species, codeInt, codeStr)
        ! Subroutine to map species to both integer and string codes accordnig to the HITRAN coding system
        implicit none
        character(len=*), intent(in) :: species  ! molecule title as string
        integer, intent(out) :: codeInt ! output code as an integer
        character(len=2), intent(out) :: codeStr ! output code as a string

        select case (trim(adjustl(species)))
            case ("H2O")
                codeInt = 1
                codeStr = "01"
            case ("CO2")
                codeInt = 2
                codeStr = "02"
            case ("O3")
                codeInt = 3
                codeStr = "03"
            case ("N2O")
                codeInt = 4
                codeStr = "04"
            case ("CO")
                codeInt = 5
                codeStr = "05"
            case ("CH4")
                codeInt = 6
                codeStr = "06"
            case ("O2")
                codeInt = 7
                codeStr = "07"
            case ("NO")
                codeInt = 8
                codeStr = "08"
            case ("SO2")
                codeInt = 9
                codeStr = "09"
            case ("NO2")
                codeInt = 10
                codeStr = "10"
            case ("NH3")
                codeInt = 11
                codeStr = "11"
            case ("HNO3")
                codeInt = 12
                codeStr = "12"
            case default
                codeInt = 0
                codeStr = "00"  ! Species not found
        end select
    end subroutine getSpeciesCode


end module EnvironmentSetup