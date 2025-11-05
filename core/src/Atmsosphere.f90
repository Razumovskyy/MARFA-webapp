module Atmosphere
    use Constants
    implicit none
    
    integer, parameter :: atmProfileUnit = 777 ! unit for the atmospheric file
    character(len=300) :: atmProfileFile ! title of the file with atmospheric data located in `data/Atmospheres`
    character(len=300) :: fullNameAtmProfile ! full path to the atmospheric file
    character(len=100) :: atmTitle ! specific atmosphere title (in the header of the atmospheric file)
    integer :: levels ! number of levels of the considered atmosphere ( located in a file header )
    real, allocatable :: heightArray(:), pressureArray(:), temperatureArray(:), densityArray(:) ! PPP, TTT, RORO (legacy)
    integer, parameter :: levelsThreshold = 200 

    ! macroscopic parameters on the current atmospheric level !
    ! temperature: temperauture on the current atmospheric level [K]
    ! pressure: total pressure on the current atmospheric level [atm]
    ! density: number density of the considered species: [(number of molecules)/(cm^2 * km)]
    !           such number density units are needed for having volume absorption coefficient in km-1
    real :: temperature, pressure, density

    real :: pSelf ! [atm] -- partial pressure of considered gaseous species
    real :: pForeign ! [atm] -- foreign pressure (p(total) - pSelf)
    
    ! Technical variables
    integer :: ios

end module Atmosphere
