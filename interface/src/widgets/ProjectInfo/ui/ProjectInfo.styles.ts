'use client'
import { styled } from "@mui/material/styles"

export const ProjectInfoContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(10),
  width: "100%",
  padding: `${theme.spacing(0)} ${theme.spacing(10)}`,
  marginTop: theme.spacing(24),
}))

export const FeaturesContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  justifyContent: "flex-start",
  alignItems: "flex-start"
}))

export const SupportContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2)
}))