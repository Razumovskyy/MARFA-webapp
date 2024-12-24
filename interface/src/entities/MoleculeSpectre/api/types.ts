export type calculateSpectreParamsType = {
  chi_factor: string,
  line_cut_off: number,
  species: string,
  v_start: string,
  v_end: string
  spectral_line_database: string,
  target_value: string,
  file: any,
}

export type commandCreateResponse = {
  zip_url: string,
  id: number
}