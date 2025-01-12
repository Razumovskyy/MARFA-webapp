import { moleculeSpectreFormData } from "@/entities/MoleculeSpectre"

export const moleculeOptions: { label: string, value: string }[] = [
  { label: "H₂O", value: "H2O" },
  { label: "CO₂", value: "CO2" },
  { label: "O₃", value: "O3" },
  { label: "N₂O", value: "N2O" },
  { label: "CO", value: "CO" },
  { label: "CH₄", value: "CH4" },
  { label: "O₂", value: "O2" },
  { label: "NO", value: "NO" },
  { label: "SO₂", value: "SO2" },
  { label: "NO₂", value: "NO2" },
  { label: "NH₃", value: "NH3" },
  { label: "HNO₃", value: "HNO3" },
]

export const targetValues = [
  { label: "absorption cross-section [cm^2]", value: "ACS" },
  { label: "volume absorption coefficient [km^-1]", value: "VAC" },
]

export const spectralLinesDatabases = [
  { label: "HITRAN-2020", value: "HITRAN2020" },
]

export const atmospheres = [
  { label: "Venus CO2", value: "VenusCO2.dat" },
  { label: "Venus H2O", value: "VenusH2O.dat" },
  { label: "VenusCO2 60km", value: "VenusCO2_60km.dat" },
]

export const initialFormValues: moleculeSpectreFormData | any | undefined = {
  species: null,
  first_spectral_interval: null,
  second_spectral_interval: null,
  spectral_line: { label: "HITRAN-2020", value: "HITRAN2020" },
  line_cut_off_condition: null,
  target_value: null,
  atmosphere: null,
  temperature: null,
  pressure: null,
  density: null,
}

export const resolutionsChart = [
  { label: "coarse", value: "coarse" },
  { label: "medium", value: "medium" },
  { label: "high", value: "high" },
]
