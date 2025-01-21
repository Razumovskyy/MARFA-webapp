"use client"
import { styled } from "@mui/material/styles"
import { AppBar, Toolbar, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"


export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  width: "100vw",
  zIndex: 1200,
  height: 75,
  backgroundColor: theme.palette.secondary.dark,
  boxShadow: "0 2px 4px rgb(0 0 0 / 5%)",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    paddingLeft: 0,
    paddingRight: 0
  }
}))

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: theme.spacing(1),
}))

export const StyledImage = styled(Image)(({ theme }) => ({
  height: "100%",
  width: "auto",
}))

export const ProjectName = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}))

export const FeaturesContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    display: "none"
  }
}))

export const LogoContainer = styled(Link)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  height: "100%",
  gap: theme.spacing(1),
  textDecoration: "none",
}))

export const VerticalLine = styled("div")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "1.5rem",
  fontWeight: "700",
}))