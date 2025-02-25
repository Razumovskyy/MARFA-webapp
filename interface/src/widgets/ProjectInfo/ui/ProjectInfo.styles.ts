"use client"
import { styled } from "@mui/material/styles"
import { CardContent } from "@mui/material"

export const ProjectInfoContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(6),
  width: "100%",
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

export const GoToCalculationsContainer = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(4),
}))