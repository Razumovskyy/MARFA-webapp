import * as yup from "yup"

export const moleculeSpectreValidationSchema = yup.object().shape({
  species: yup.object().required("Choose a value."),
  first_spectral_interval: yup
    .number()
    .required("Enter a value.")
    .typeError("Enter a number")
    .test("is-less-than-second", "First interval must be less than second interval", function(value) {
      return value <= this.parent.second_spectral_interval
    }),
  second_spectral_interval: yup
    .number()
    .required("Enter a value.")
    .typeError("Enter a number"),
  spectral_line: yup.object().required("Choose a value."),
  line_cut_off_condition: yup.number().required("Enter a value"),
  chi_factor: yup.object().required("Choose a value"),
  target_value: yup.object().required("Enter a value."),
  file: yup.mixed().notRequired(),
  atmosphere: yup.object().notRequired()
})

export const chartSpectreValidationSchema = yup.object().shape({
  v1: yup.number().required("Enter a number").typeError("Enter a number"),
  v2: yup.number().required("Enter a number").typeError("Enter a number"),
  resolution: yup.string().required("").typeError(""),
  level: yup.number().required("Enter a number").typeError("Enter a number")
})