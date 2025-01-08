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
  const { screenState, setScreenState, setZipUrl, setId } = useMolecularSpectreData()
  const [isFile, setIsFile] = useState(false)

  const methods = useForm<moleculeSpectreFormData>({
    defaultValues: initialFormValues,
    resolver: yupResolver(moleculeSpectreValidationSchema),
  })

  const [showCO2Fields, setShowCO2Fields] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = methods

  const onSubmit = (data: moleculeSpectreFormData) => {
    setIsLoading(true)
    getSpectre(formDataToRequestMapper<moleculeSpectreFormData, calculateSpectreParamsType>(data, isFile)).then(res => {
      setIsLoading(false)
      setId(res.data.id)
      setZipUrl(res.data.download_link)
      setScreenState(1)
    }).catch(err => {
    }).finally(() => {
      setIsLoading(false)
    })
  }


  const goToDataFormat = () => {
    window.open("/data-format", "_self")
  }


  return (
    <>
      <Styled.CardContent sx={{ display: screenState === 0 ? "" : "none" }}>
        <FormProvider {...methods}>
          <Controller
            name="species"
            control={control as Control<FieldValues>}
            render={({ field }) => (
              <Autocomplete
                size={"medium"}
                options={moleculeOptions}
                label={"Choose species"}
                onChange={(event, value) => {
                  setShowCO2Fields(!!value && value["label"] === "CO2")
                  field.onChange(value)
                }}
                value={field.value}
                style={{ width: theme.spacing(76) }}
                error={!!errors.species}
                errorMessage={errors.species?.message}
              />
            )}
          />
          <Styled.SpectreIntervalContainer>
            <Typography variant={"caption"} fontWeight={"medium"} sx={{ fontSize: "14px" }}>Spectral interval
              (cm-1):</Typography>
            <Styled.FieldsContainer>
              <Controller
                name="first_spectral_interval"
                control={control as Control<FieldValues>}
                render={({ field }) => (
                  <TextField
                    value={field.value}
                    {...field}
                    style={{ width: "137px" }}
                    label={""}
                    variant={"outlined"}
                    error={!!errors.first_spectral_interval}
                    helperText={errors.first_spectral_interval?.message}
                  />
                )}
              />
              <Typography variant={"body1"} fontSize={"medium"} fontWeight={"large"}>—</Typography>
              <Controller
                name="second_spectral_interval"
                control={control as Control<FieldValues>}
                render={({ field }) => (
                  <TextField
                    value={field.value}
                    {...field}
                    style={{ width: "137px" }}
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
            name="spectral_line"
            control={control as Control<FieldValues>}
            render={({ field }) => (
              <Autocomplete
                options={spectralLinesDatabases}
                label={"Choose Spectral Line Database"}
                onChange={(event, value) => field.onChange(value)}
                value={field.value}
                style={{ width: theme.spacing(76) }}
                error={!!errors.spectral_line}
                errorMessage={errors.spectral_line?.message}
              />
            )}
          />
          <Controller
            name="line_cut_off_condition"
            control={control as Control<FieldValues>}
            render={({ field }) => (
              <TextField
                value={field.value}
                {...field}
                style={{ width: theme.spacing(76) }}
                label={"Set line cut-off condition (0-500 cm^-1)"}
                variant={"outlined"}
                error={!!errors.line_cut_off_condition}
                helperText={errors.line_cut_off_condition?.message}
              />
            )}
          />
          <Controller
            name="target_value"
            control={control as Control<FieldValues>}
            render={({ field }) => (
              <Autocomplete
                options={targetValues}
                label={"Choose target value"}
                onChange={(event, value) =>
                  field.onChange(value)
                }
                value={field.value}
                style={{ width: theme.spacing(76) }}
                error={!!errors.target_value}
                errorMessage={errors.target_value?.message}
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
                style={{ width: theme.spacing(76) }}
                label={"Temperature"}
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
                style={{ width: theme.spacing(76) }}
                label={"Pressure"}
                variant={"outlined"}
                error={!!errors.pressure}
                helperText={errors.pressure?.message}
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
                style={{ width: theme.spacing(76) }}
                label={"Density"}
                variant={"outlined"}
                error={!!errors.density}
                helperText={errors.density?.message}
              />
            )}
          />
          <Styled.SendDataContainer>
            <Button disabled={isLoading} onClick={handleSubmit(onSubmit)} variant={"contained"}
                    color={"primary"}>Calculate</Button>
            {isLoading && <CircularProgress size={theme.spacing(6)} />}
          </Styled.SendDataContainer>
        </FormProvider>
      </Styled.CardContent>
    </>
  )
}