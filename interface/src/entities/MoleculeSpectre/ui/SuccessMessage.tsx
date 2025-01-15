import React from "react"
import * as Styled from "./MoleculeSpectre.styles"
import { Typography, useTheme } from "@mui/material"
export const SuccessMessage = () => {
  const theme = useTheme()

  return (
    <Styled.SuccessMessageContainer>
      <Typography sx={{ color: theme.palette.success.main}}>Absorption spectra has been calculated ! </Typography>
      <Typography>Here you can download an archive with resulting data and generate plots.</Typography>
    </Styled.SuccessMessageContainer>
  )
}
