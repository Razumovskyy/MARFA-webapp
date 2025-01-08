import { moleculeSpectreFormData } from "@/entities/MoleculeSpectre"

export const moleculeOptions: { label: string, value: string }[] = [
  { label: "H2O", value: "H2O" },
  { label: "CO2", value: "CO2" },
]

export const targetValues = [
  { label: "Absorption cross-section [cm^2/mol] (ACS)", value: "ACS"},
  { label: "Volume absorption coefficient [km^-1] (VAC) ", value: "VAC"}
]

export const spectralLinesDatabases = [
  { label: "HITRAN-2020", value: "HITRAN2020"},
]

export const atmospheres = [
  { label: "Venus CO2", value: "VenusCO2.dat"},
  { label: "Venus H2O", value: "VenusH2O.dat"},
  { label: "VenusCO2 60km", value: "VenusCO2_60km.dat"}
]

export const chiFactors = [
  { label: "None", value: "none"},
  { label: "tonkov", value: "tonkov"},
  { label: "pollack", value: "pollack"},
  { label: "perrin", value: "perrin"}
]

export const initialFormValues: moleculeSpectreFormData | any | undefined = {
  species: null,
  first_spectral_interval: null,
  second_spectral_interval: null,
  spectral_line: null,
  line_cut_off_condition: null,
  chi_factor: null,
  target_value: null,
  pressure: null,
  temperature: null
}

export const resolutionsChart = [
  { label: "coarse", value: "coarse"},
  { label: "medium", value: "medium"},
  { label: "high", value: "high"}
]