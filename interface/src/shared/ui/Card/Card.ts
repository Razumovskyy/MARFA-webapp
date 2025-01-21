"use client"
import { styled } from "@mui/material/styles"
import { Card, CardContent } from "@mui/material"

export const StyledCard = styled(Card)(({ theme }) => ({
  background: "#FFFFFF",
  border: "2px solid #FBFBFB",
  boxShadow: "0px 0px 10px rgba(54, 54, 54, 0.1)",
  borderRadius: 6,
  padding: `${theme.spacing(2)} ${theme.spacing(2)}`,
  width: "100%"
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4)
}))