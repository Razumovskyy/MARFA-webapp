export type calculateSpectreParamsType = {
  line_cut_off: number,
  species: string,
  v_start: string,
  v_end: string
  spectral_line_database: string,
  target_value: string,
  temperature: number,
  pressure: number
  density: number
}

export type commandCreateResponse = {
  download_link: string,
  id: number
}