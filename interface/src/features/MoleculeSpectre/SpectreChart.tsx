"use client"
import React, { useState } from "react"
import { useMolecularSpectreData } from "@/entities/MoleculeSpectre/models/MoleculeSpectreContext"
import * as Styled from "./MoleculeSpectre.styles"
import { Control, Controller, FieldValues, FormProvider, useForm } from "react-hook-form"
import {
  initialFormValues,
  moleculeSpectreFormData,
  moleculeSpectreValidationSchema,
  resolutionsChart, spectralLinesDatabases,
} from "@/entities/MoleculeSpectre"
import { yupResolver } from "@hookform/resolvers/yup"
import { CircularProgress, Typography, useTheme } from "@mui/material"
import { Autocomplete, Button, TextField } from "@/shared/ui"
import { chartSpectreValidationSchema } from "@/entities/MoleculeSpectre"
import { chartSpectreFormData } from "@/entities/MoleculeSpectre/models/types"
import { fetchChart } from "@/entities/MoleculeSpectre/api/moleculeSpectre.api"

export const SpectreChart = ({}) => {
  const theme = useTheme()
  const { screenState, setScreenState, setZipUrl, setId, id } = useMolecularSpectreData()
  const methods = useForm<chartSpectreFormData>({
    defaultValues: initialFormValues,
    resolver: yupResolver(chartSpectreValidationSchema),
  })
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = methods
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState<string | null>(null)

  const onSubmit = (data: chartSpectreFormData) => {
    setIsLoading(true)
    if (!!id) {
      fetchChart(data, id).then(res => {
        setImage(res.data.plot_url)
      }).catch(err => {
        if (err.response && err.response.data) {
          const apiErrors = err.response.data
          Object.keys(apiErrors).forEach(field => {
            setError(field as keyof chartSpectreFormData, {
              type: "server",
              message: "",
            })
          })
        }
      }).finally(() => {
        setIsLoading(false)
      })
    }
  }


  return (
    <Styled.SpectreChartMainContainer>
      <FormProvider {...methods}>
        <Styled.ChartFormContainer>
          <Styled.ChartParamContainer>
            <Typography>Spectral interval (cm-1):</Typography>
            <Controller name="v1"
                        control={control as Control<FieldValues>}
                        render={({ field }) => (
                          <TextField value={field.value}
                                     {...field}
                                     style={{ width: "137px" }}
                                     variant={"outlined"}
                                     label={""}
                                     error={!!errors.v1}
                                     helperText={errors.v1?.message}
                          />
                        )}
            />
            <Typography variant={"body1"} fontSize={"medium"} fontWeight={"large"}>—</Typography>
            <Controller name="v2"
                        control={control as Control<FieldValues>}
                        render={({ field }) => (
                          <TextField value={field.value}
                                     {...field}
                                     style={{ width: "137px" }}
                                     variant={"outlined"}
                                     label={""}
                                     error={!!errors.v2}
                                     helperText={errors.v2?.message}
                          />
                        )}
            /> </Styled.ChartParamContainer>
          <Styled.ChartParamContainer>
            <Typography>Set layer number to draw the graph:</Typography>
            <Controller name="level"
                        control={control as Control<FieldValues>}
                        render={({ field }) => (
                          <TextField value={field.value}
                                     {...field}
                                     style={{ width: "137px" }}
                                     variant={"outlined"}
                                     label={""}
                                     error={!!errors.level}
                                     helperText={errors.level?.message}
                          />
                        )}
            /> </Styled.ChartParamContainer>
          <Controller
            name="resolution"
            control={control as Control<FieldValues>}
            render={({ field }) => (
              <Autocomplete
                options={resolutionsChart}
                {...field}
                label={"Choose chart resolution"}
                onChange={(event, value) =>
                  field.onChange(!(value) || value["value"] || null)
                }
                value={field.value}
                style={{ width: theme.spacing(76) }}
                error={!!errors.resolution}
                errorMessage={errors.resolution?.message}
              />
            )}
          />
          {!!image && <Styled.ImageChart key={image} width={1200} height={800} alt={"Spectre chart"}
                                         src={image} />}
          <Styled.FetchChartContainer>
            <Button disabled={isLoading} variant={"contained"} color={"primary"} onClick={handleSubmit(onSubmit)}>Get
              chart</Button>
            {isLoading && <CircularProgress size={theme.spacing(6)} />}
          </Styled.FetchChartContainer>
        </Styled.ChartFormContainer>
      </FormProvider>
    </Styled.SpectreChartMainContainer>
  )
}