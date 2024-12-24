import React, { useState } from "react"
import { CircularProgress, Typography, useTheme } from "@mui/material"
import { Control, Controller, FieldValues, FormProvider, useForm } from "react-hook-form"
import {
  getSpectre, calculateSpectreParamsType, chiFactors, formDataToRequestMapper,
  initialFormValues, moleculeOptions,
  moleculeSpectreFormData,
  moleculeSpectreValidationSchema, spectralLinesDatabases, targetValues, atmospheres,
} from "@/entities/MoleculeSpectre"
import { yupResolver } from "@hookform/resolvers/yup"
import { Autocomplete, Button, TextField } from "@/shared/ui"
import * as Styled from "./MoleculeSpectre.styles"
import { FileUploader } from "@/shared/assets"
import { AxiosResponse } from "axios"
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
    if (!data.file && !data.atmosphere) {
      setError("atmosphere", {
        type: "manual",
        message: "Please choose the atmosphere or upload a file", // Сообщение об ошибке
      })
      setIsLoading(false)
      return
    }
    getSpectre(formDataToRequestMapper<moleculeSpectreFormData, calculateSpectreParamsType>(data, isFile)).then(res => {
      setIsLoading(false)
      setId(res.data.id)
      setZipUrl(res.data.zip_url)
      setScreenState(1)
    }).catch(err => {
        if (err.response.status === 415) {
          setError("file", { type: "server", message: "File is not valid" })
        }
      },
    ).finally(() => {
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
            name="chi_factor"
            control={control as Control<FieldValues>}
            render={({ field }) => (
              <Autocomplete
                options={chiFactors}
                label={"Choose chi-factor"}
                onChange={(event, value) => field.onChange(value)}
                value={field.value}
                style={{ width: theme.spacing(76) }}
                error={!!errors.chi_factor}
                errorMessage={errors.chi_factor?.message}
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
          <Styled.FieldsContainer sx={{
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
            },
          }}>
            <Controller name="atmosphere"
                        control={control as Control<FieldValues>}
                        render={({ field }) => (
                          <Autocomplete onChange={(event, value) => field.onChange(value)}
                                        value={field.value}
                                        options={atmospheres}
                                        style={{ width: theme.spacing(76) }}
                                        error={!!errors.atmosphere}
                                        errorMessage={errors.atmosphere?.message}
                                        label={"Choose the atmospheric profile:"}
                                        disabled={isFile}
                          />
                        )}
            />
            <Typography sx={{ alignSelf: "baseline", marginTop: "6px" }} variant={"body1"} fontSize={"medium"}
                        fontWeight={"medium"}>OR</Typography>
            <Controller name="file"
                        control={control as Control<FieldValues>}
                        render={({ field }) => (
                          <Styled.UploadFileContainer>
                            <FileUploader file={field.value} setFile={(e) => {
                              field.onChange(e)
                              setIsFile(!!e)
                            }} errors={errors.file?.message} />
                            <Typography
                              sx={{ display: "flex", flexDirection: "row", wrap: "no-wrap", width: "fit-content" }}
                              variant={"caption"} fontWeight={"medium"}>Before uploading review the
                              required <Styled.GoToDescriptionText
                                href={"format"}>data format</Styled.GoToDescriptionText></Typography>
                          </Styled.UploadFileContainer>
                        )}
            />
          </Styled.FieldsContainer>
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