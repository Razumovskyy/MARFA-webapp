import * as yup from "yup"

export const moleculeSpectreValidationSchema = yup.object().shape({
  species: yup.object().required("Select a value."),
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
  spectral_line: yup.object().required("Select a value."),
  line_cut_off_condition: yup.number().required("Enter a value"),
  target_value: yup.object().required("Enter a value."),
  temperature: yup.number().required("Enter a value"),
  pressure: yup.number().required("Enter a value"),
  density: yup
    .number()
    .when("spectral_line", {
      is: (value) => value === "VAC",
      then: (schema) => schema.required("Enter a number"),
      otherwise: (schema) => schema.notRequired(),
    }),
})

export const chartSpectreValidationSchema = yup.object().shape({
  v1: yup.number().required("Enter a number").typeError("Enter a number"),
  v2: yup.number().required("Enter a number").typeError("Enter a number"),
})
