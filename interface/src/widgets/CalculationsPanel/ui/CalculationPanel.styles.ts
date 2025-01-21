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
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  padding: `${theme.spacing(0)} ${theme.spacing(31)}`,
  marginTop: theme.spacing(24),
  [theme.breakpoints.down("lg")]: {
    paddingTop: theme.spacing(16),
    paddingLeft: theme.spacing(16),
    paddingRight: theme.spacing(16),
    paddingBottom: theme.spacing(16),
  },
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(16),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(16),
  },
  [theme.breakpoints.down("sm")]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(16),
    paddingRight: theme.spacing(16),
    gap: theme.spacing(6),
  },
  [theme.breakpoints.down("xs")]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    gap: theme.spacing(6),
  },
}))

export const DownloadDataContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(1),
  justifyContent: "center",
  height: "100%"
}))

export const CardsDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: theme.spacing(10),
  width: "100%",
}))