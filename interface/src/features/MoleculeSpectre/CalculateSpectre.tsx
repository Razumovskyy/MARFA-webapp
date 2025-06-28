import React, { useState } from "react"
import { CircularProgress, Typography, useTheme } from "@mui/material"
import { Control, Controller, FieldValues, FormProvider, useForm } from "react-hook-form"
import {
  getSpectre, calculateSpectreParamsType, formDataToRequestMapper,
  initialFormValues, moleculeOptions,
  moleculeSpectreFormData,
  moleculeSpectreValidationSchema, spectralLinesDatabases, targetValues, atmospheres,
} from "@/entities/MoleculeSpectre"
import { yupResolver } from "@hookform/resolvers/yup"
import { Autocomplete, Button, TextField } from "@/shared/ui"
import * as Styled from "./MoleculeSpectre.styles"
import { useMolecularSpectreData } from "@/entities/MoleculeSpectre/models/MoleculeSpectreContext"

export const CalculateSpectre = () => {

  const theme = useTheme()
  const { screenState, setScreenState, setZipUrl, setId, setSpectreData } = useMolecularSpectreData()
  const [visibleDensity, setVisibleDensity] = useState(true)
  const [requestError, setRequestError] = useState<null | string>(null)
  const methods = useForm<moleculeSpectreFormData>({
    defaultValues: initialFormValues,
    resolver: yupResolver(moleculeSpectreValidationSchema),
  })

  const [showCO2Fields, setShowCO2Fields] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = methods

  const onSubmit = (data: moleculeSpectreFormData) => {
    if (!Number(data.density) && data.target_value?.value === "VAC") {
      setError("density", { type: "server", message: "Enter a number." })
      return
    }
    setIsLoading(true)
    let request_data = formDataToRequestMapper(data)
    getSpectre(request_data).then(res => {
      setIsLoading(false)
      setSpectreData({
        ...request_data,
        target_value: request_data.target_value === "VAC" ? "volume absorption coefficient" : "absorption cross-section",
        species: data.species?.label,
      })
      setId(res.data.id)
      setZipUrl(res.data.download_link)
      setScreenState(1)
    }).catch(err => {
      if (err.response.status === 500) {
        setRequestError("Error occurred while running MARFA executable.")
        setTimeout(() => {
          setRequestError(null)
        }, 10000)
      }
    }).finally(() => {
      setIsLoading(false)
    })
  }


  return (
    <>
      <Styled.CardContent sx={{ display: screenState === 0 ? "" : "none" }}>
        <FormProvider {...methods}>
          <Controller
            name="spectral_line"
            control={control as Control<FieldValues>}
            render={({ field }) => (
              <Autocomplete
                disabled={true}
                options={spectralLinesDatabases}
                label={"Select spectral database"}
                onChange={(event, value) => field.onChange(value)}
                value={field.value["label"]}
                style={{ width: theme.spacing(100) }}
                error={!!errors.spectral_line}
                errorMessage={errors.spectral_line?.message}
              />
            )}
          />
          <Controller
            name="species"
            control={control as Control<FieldValues>}
            render={({ field }) => (
              <Autocomplete
                size={"medium"}
                options={moleculeOptions}
                label={"Select species"} xx
                onChange={(event, value) => {
                  setShowCO2Fields(!!value && value["label"] === "CO2")
                  field.onChange(value)
                }}
                value={field.value}
                style={{ width: theme.spacing(100) }}
                error={!!errors.species}
                errorMessage={errors.species?.message}
              />
            )}
          />
          <Styled.SpectreIntervalContainer>
            <Typography variant={"caption"} fontWeight={"medium"} sx={{ fontSize: "14px" }}>Spectral interval
              (e.g., 500–1500 cm⁻¹):</Typography>
            <Styled.FieldsContainer>
              <Controller
                name="first_spectral_interval"
                control={control as Control<FieldValues>}
                render={({ field }) => (
                  <TextField
                    value={field.value}
                    {...field}
                    style={{ width: theme.spacing(46) }}
                    label={""}
                    variant={"outlined"}
                    error={!!errors.first_spectral_interval}
                    helperText={errors.first_spectral_interval?.message}
                  />
                )}
              />
              <Typography variant={"body1"} fontSize={"medium"} fontWeight={"large"}
                          sx={{ color: "black" }}>—</Typography>
              <Controller
                name="second_spectral_interval"
                control={control as Control<FieldValues>}
                render={({ field }) => (
                  <TextField
                    value={field.value}
                    {...field}
                    style={{ width: theme.spacing(46) }}
                    label={""}
                    variant={"outlined"}
                    error={!!errors.second_spectral_interval}
                    helperText={errors.second_spectral_interval?.message}
                  />
                )}
              />
            </Styled.FieldsContainer>
          </Styled.SpectreIntervalContainer>
          <Controller
            name="line_cut_off_condition"
            control={control as Control<FieldValues>}
            render={({ field }) => (
              <TextField
                value={field.value}
                {...field}
                style={{ width: theme.spacing(100) }}
                label={"Line cut-off condition (e.g. 125 cm⁻¹)"}
                variant={"outlined"}
                error={!!errors.line_cut_off_condition}
                helperText={errors.line_cut_off_condition?.message}
              />
            )}
          />
          <Controller
            name="temperature"
            control={control as Control<FieldValues>}
            render={({ field }) => (
              <TextField
                value={field.value}
                {...field}
                style={{ width: theme.spacing(100) }}
                label={"Temperature (e.g. 300 K)"}
                variant={"outlined"}
                error={!!errors.temperature}
                helperText={errors.temperature?.message}
              />
            )}
          />
          <Controller
            name="pressure"
            control={control as Control<FieldValues>}
            render={({ field }) => (
              <TextField
                value={field.value}
                {...field}
                style={{ width: theme.spacing(100) }}
                label={"Pressure (e.g. 1 atm)"}
                variant={"outlined"}
                error={!!errors.pressure}
                helperText={errors.pressure?.message}
              />
            )}
          />
          <Controller
            name="target_value"
            control={control as Control<FieldValues>}
            render={({ field }) => (
              <Autocomplete
                options={targetValues}
                label={"Select target value"}
                onChange={(event, value) => {
                  field.onChange(value)
                  setVisibleDensity(!!value && value["value"] === "ACS")
                }}
                value={field.value}
                style={{ width: theme.spacing(100) }}
                error={!!errors.target_value}
                errorMessage={errors.target_value?.message}
              />
            )}
          />
          <Controller
            name="density"
            control={control as Control<FieldValues>}
            render={({ field }) => (
              <TextField
                value={field.value}
                {...field}
                disabled={visibleDensity}
                style={{ width: theme.spacing(100) }}
                label={"Number Density (e.g. 1E25 cm⁻²·km⁻¹)"}
                variant={"outlined"}
                error={!!errors.density}
                helperText={errors.density?.message}
              />
            )}
          />
          <Styled.SendDataContainer>
            <Button disabled={isLoading} onClick={handleSubmit(onSubmit)} variant={"contained"}
                    color={"primary"}>Calculate</Button>
            {!!requestError &&
              <Typography sx={{ color: theme.palette.error.main }} variant={"caption"} fontWeight={"small"}
                          fontSize={"small"}>{requestError}</Typography>}
            {isLoading && <CircularProgress size={theme.spacing(6)} />}
          </Styled.SendDataContainer>
        </FormProvider>
      </Styled.CardContent>
    </>
  )
}