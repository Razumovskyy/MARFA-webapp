'use client'
import { styled } from "@mui/material/styles"

export const AboutDataContainer = styled("div")(({ theme }) => ({
  display: "flex",
  width: "60%",
  marginTop: theme.spacing(24),
  gap: theme.spacing(6),
  alignSelf: "center",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
}))