export type moleculeSpectreFormData = {
  species: { label: string, value: string} | null,
  first_spectral_interval: number,
  second_spectral_interval: number,
  spectral_line: { label: string, value: string},
  line_cut_off_condition: number,
  target_value: { label: string, value: string} | null,
  atmosphere: null | string | object,
  temperature: number,
  pressure: number
  density: number
}

export type requestFormData = {
  line_cut_off: number,
  species: string,
  v_start: number,
  v_end: number,
  database_slug: string,
  target_value: string,
  temperature: number,
  pressure: number,
  density: number | string
}

export type chartSpectreFormData = {
  v1: number,
  v2: number,
}
