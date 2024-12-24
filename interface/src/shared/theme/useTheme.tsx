"use client"
import { createTheme } from "@mui/material/styles"
import typographies from "./typographies"
import defaultTheme from "./default"

//@ts-ignore
const theme = createTheme({
  ...typographies,
  ...defaultTheme
})

export default theme