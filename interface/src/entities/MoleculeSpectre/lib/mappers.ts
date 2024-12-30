export function formDataToRequestMapper<T, P>(data: T, isFile: boolean): P {
  return {
    chi_factor: data.chi_factor?.value,
    line_cut_off: data.line_cut_off_condition,
    species: data.species?.value,
    v_start: data.first_spectral_interval,
    v_end: data.second_spectral_interval,
    database_slug: data.spectral_line.value,
    target_value: data.target_value?.value,
    file: isFile ? data.file : undefined,
    spectre_type: isFile ? "custom" : "default",
    file_name: !isFile ? data.atmosphere.value : undefined
  } as P
}
