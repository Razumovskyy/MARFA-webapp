"use client"
import React, { useState } from "react"
import { useMolecularSpectreData } from "@/entities/MoleculeSpectre/models/MoleculeSpectreContext"
import * as Styled from "./MoleculeSpectre.styles"
import { Control, Controller, FieldValues, FormProvider, useForm } from "react-hook-form"
import {
  initialFormValues,
  resolutionsChart,
} from "@/entities/MoleculeSpectre"
import { yupResolver } from "@hookform/resolvers/yup"
import { CircularProgress, Typography, useTheme, FormControlLabel, Switch } from "@mui/material"
import { Autocomplete, Button, TextField } from "@/shared/ui"
import { chartSpectreValidationSchema } from "@/entities/MoleculeSpectre"
import { chartSpectreFormData } from "@/entities/MoleculeSpectre/models/types"
import { fetchChart } from "@/entities/MoleculeSpectre/api/moleculeSpectre.api"

export const SpectreChart = ({}) => {
  const theme = useTheme()
  const { id, spectreData } = useMolecularSpectreData()
  const methods = useForm<chartSpectreFormData>({
    defaultValues: { 
      v1: spectreData?.v_start || 0, 
      v2: spectreData?.v_end || 0, 
      is_logarithmic: true 
    },
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
        setImage(res.data.plot)
      }).catch(err => {
        if (err.response && err.response.data) {
          const apiErrors = err.response.data
          Object.keys(apiErrors).forEach(field => {
            console.log(field)
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
    <>
      <Styled.SpectreChartMainContainer>
        <FormProvider {...methods}>
          <Styled.ChartFormContainer>
            <Styled.ChartParamContainer>
              <Typography variant={"caption"} fontSize={"small"} fontWeight={"small"} sx={{ width: "100%" }}>Spectral
                interval</Typography>
              <Styled.ChartFieldsContainer>
                <Controller name="v1"
                            control={control}
                            render={({ field }) => (
                              <TextField value={field.value.toString()}
                                         onChange={(e) => field.onChange(Number(e.target.value))}
                                         name={field.name}
                                         style={{ width: theme.spacing(46) }}
                                         variant={"outlined"}
                                         label={""}
                                         error={!!errors.v1}
                                         helperText={errors.v1?.message}
                              />
                            )}
                />
                <Typography variant={"body1"} fontSize={"medium"} fontWeight={"large"}>—</Typography>
                <Controller name="v2"
                            control={control}
                            render={({ field }) => (
                              <TextField value={field.value.toString()}
                                         onChange={(e) => field.onChange(Number(e.target.value))}
                                         name={field.name}
                                         style={{ width: theme.spacing(46) }}
                                         variant={"outlined"}
                                         label={""}
                                         error={!!errors.v2}
                                         helperText={errors.v2?.message}
                              />
                            )}/>
              </Styled.ChartFieldsContainer>
            </Styled.ChartParamContainer>
            <Styled.ChartParamContainer>
              <Typography variant={"caption"} fontSize={"small"} fontWeight={"small"} sx={{ width: "100%" }}>
                Chart Options
              </Typography>
              <Controller name="is_logarithmic"
                          control={control}
                          render={({ field }) => (
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={field.value}
                                  onChange={(e) => field.onChange(e.target.checked)}
                                  name="is_logarithmic"
                                  color="primary"
                                />
                              }
                              label="Logarithmic scale"
                            />
                          )}
              />
            </Styled.ChartParamContainer>
            <Styled.FetchChartContainer>
              <Button disabled={isLoading} variant={"outlined"} color={"primary"} onClick={handleSubmit(onSubmit)}>Generate
                Plot</Button>
              {isLoading && <CircularProgress size={theme.spacing(6)} />}
            </Styled.FetchChartContainer>
          </Styled.ChartFormContainer>
        </FormProvider>
      </Styled.SpectreChartMainContainer>
      {!!image && <Styled.ChartContainer dangerouslySetInnerHTML={{ __html: image }}></Styled.ChartContainer>}
    </>
  )
}