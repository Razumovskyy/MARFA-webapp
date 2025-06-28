import { styled } from "@mui/material/styles"
import Image from "next/image"
import { Typography } from "@mui/material"
import Link from "next/link"

export const SendDataContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: theme.spacing(4),
  alignSelf: "center"
}))

export const CardContent = styled("form")(({ theme }) => ({
  alignSelf: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "baseline",
  justifyContent: "center",
  gap: theme.spacing(10)
}))

export const SpectreIntervalContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  gap: theme.spacing(2),
}))

export const FieldsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: theme.spacing(2),
}))

export const SpectreChartMainContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  alignSelf: "center",
  padding: `0px ${theme.spacing(40)}`,
  [theme.breakpoints.down("sm")]: {
    padding: 0,
  }
}))

export const ChartFormContainer = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: theme.spacing(6),
}))

export const ChartParamContainer = styled("div")(({ theme }) => (({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
})))

export const ChartFieldsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(1)
  }
}))

export const ChartContainer = styled("div")(({ theme }) => ({
  height: "auto",
  display: "flex",
  alignSelf: "center",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center"
}))

export const FetchChartContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(4),
}))