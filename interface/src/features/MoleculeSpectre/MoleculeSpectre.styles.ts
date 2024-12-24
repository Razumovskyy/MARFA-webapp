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
  alignItems: "flex-start",
  justifyContent: "flex-start",
  gap: theme.spacing(2),
}))

export const UploadFileContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  alignItems: "flex-start",
  justifyContent: "flex-start"
}))

export const GoToDescriptionText = styled(Link)(({ theme }) => ({
  color: "#0000EE",
  textDecoration: "underline",
  cursor: "pointer",
  width: "fit-content",
  marginLeft: theme.spacing(1)
}))

export const SpectreChartMainContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  alignSelf: "flex-start",
  padding: `0px ${theme.spacing(40)}`,
  [theme.breakpoints.down("sm")]: {
    padding: 0,
  }
}))

export const ChartFormContainer = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  gap: theme.spacing(6)
}))

export const ChartParamContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(1)
  }
}))

export const ImageChart = styled(Image)(({ theme }) => ({
  height: "auto",
  width: "100%",
  alignSelf: "center"
}))

export const FetchChartContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: theme.spacing(4),
  alignSelf: "flex-start"
}))