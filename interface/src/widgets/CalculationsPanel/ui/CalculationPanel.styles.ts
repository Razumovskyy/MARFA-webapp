"use client"
import { styled } from "@mui/material/styles"

export const ResultPanelMainDiv = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(10),
  padding: theme.spacing(6),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0)
  }
}))

export const CalculationPanel = styled("div")(({ theme })=>({
  width: "100%",
  padding: `${theme.spacing(0)} ${theme.spacing(10)}`,
  marginTop: theme.spacing(24),
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  gap: theme.spacing(10),
  [theme.breakpoints.down("sm")]: {
    padding: `${theme.spacing(0)} ${theme.spacing(2)}`,
  }
}))

export const DownloadDataContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),
}))

export const SpectreFormParamsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  alignSelf: "flex-start"
}))