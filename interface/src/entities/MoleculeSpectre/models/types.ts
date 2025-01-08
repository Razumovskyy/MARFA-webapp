export type moleculeSpectreFormData = {
  species: { label: string, value: string} | null,
  first_spectral_interval: number,
  second_spectral_interval: number,
  spectral_line: { label: string, value: string},
  line_cut_off_condition: number,
  chi_factor: { label: string, value: string } | null,
  target_value: { label: string, value: string} | null,
  temperature: number
  pressure: number
}

export type chartSpectreFormData = {
  v1: number,
  v2: number,
  resolution: string,
  level: number
}
