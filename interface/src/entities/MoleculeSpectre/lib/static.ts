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
  { label: "absorption cross-section", value: "ACS"},
  { label: "volume absorption coefficient", value: "VAC"}
]

export const spectralLinesDatabases = [
  { label: "HITRAN-2020", value: "HITRAN2020"},
]

export const atmospheres = [
  { label: "Venus CO2", value: "VenusCO2.dat"},
  { label: "Venus H2O", value: "VenusH2O.dat"},
  { label: "VenusCO2 60km", value: "VenusCO2_60km.dat"}
]

export const initialFormValues: moleculeSpectreFormData | any | undefined = {
  species: null,
  first_spectral_interval: null,
  second_spectral_interval: null,
  spectral_line: { label: "HITRAN-2020", value: "HITRAN2020"},
  line_cut_off_condition: null,
  target_value: null,
  atmosphere: null,
  temperature: null,
  pressure: null,
  density: null
}

export const resolutionsChart = [
  { label: "coarse", value: "coarse"},
  { label: "medium", value: "medium"},
  { label: "high", value: "high"}
]

export const resultParams = [
  { label: "Spectral line database", value: "database_slug", id: 1, units: ""},
  { label: "Species", value: "species", id: 6, units: ""},
  { label: "Start of spectral interval", value: "v_start", id: 2, units: "cm⁻¹"},
  { label: "End of spectral interval", value: "v_end", id: 3, units: "cm⁻¹"},
  { label: "Line cut off condition", value: "line_cut_off", id: 4, units: "cm⁻¹"},
  { label: "Target value", value: "target_value", id: 5, units: 'cm<sup>2</sup>'},
  { label: "Pressure", value: "pressure", id: 7, units: "atm"},
  { label: "Temperature", value: "temperature", id: 8, units: "K"},
  { label: "Density", value: "density", id: 9, units: "cm⁻²·km⁻¹"},
]
