import * as yup from "yup"

export const moleculeSpectreValidationSchema = yup.object().shape({
  species: yup.object().required("Select a value."),
  first_spectral_interval: yup
    .number()
    .required("Enter a number")
    .typeError("Enter a number")
    .min(10, "Minimum number is 10")
    .max(14000, "Maximum number is 14000")
    .test("is-less-than-second", "First interval must be less", function(value) {
      return value <= this.parent.second_spectral_interval
    }),
  second_spectral_interval: yup
    .number()
    .min(10, "Minimum number is 10")
    .max(14000, "Maximum number is 14000")
    .required("Enter a number")
    .typeError("Enter a number"),
  spectral_line: yup.object().required("Select a value"),
  line_cut_off_condition: yup
    .number()
    .required("Enter a number")
    .typeError("Enter a number")
    .min(0, "Minimum number is 10")
    .max(500, "Maximum number is 500"),
  target_value: yup.object().required("Select a value"),
  temperature: yup
    .number()
    .required("Enter a number")
    .min(20, "Minimum number is 20")
    .max(1000, "Maximum number is 1000"),
  pressure: yup
    .number()
    .required("Enter a number")
    .typeError("Enter a number")
    .min(0, "Minimum number is 0"),
  density: yup
    .string()
    .when("spectral_line", {
      is: (value) => value === "VAC",
      then: (schema) =>
        schema
          .required("Enter a number")
          .min(0, "Minimum number is 0")
          .max(1000, "Maximum number is 1000"),
      otherwise: (schema) => schema.notRequired(),
    }),
})

export const chartSpectreValidationSchema = yup.object().shape({
  v1: yup.number().required("Enter a number").typeError("Enter a number"),
  v2: yup.number().required("Enter a number").typeError("Enter a number"),
})
