'use client'
import { styled } from "@mui/material/styles"

export const AboutDataContainer = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  marginTop: theme.spacing(24),
  gap: theme.spacing(6),
  padding: `${theme.spacing(0)} ${theme.spacing(10)}`,
  alignSelf: "center",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
}))