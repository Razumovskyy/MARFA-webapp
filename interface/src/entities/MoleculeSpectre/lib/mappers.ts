export function formDataToRequestMapper<T, P>(data: T): P {
  return {
    line_cut_off: data.line_cut_off_condition,
    species: data.species?.value,
    v_start: data.first_spectral_interval,
    v_end: data.second_spectral_interval,
    database_slug: data.spectral_line.value,
    target_value: data.target_value?.value,
    temperature: data.temperature,
    pressure: data.pressure,
    density: data.target_value.value === "VAC" ? data.density : "1"
  } as P
}
