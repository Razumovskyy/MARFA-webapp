import React from "react"
import * as Styled from "./MoleculeSpectre.styles"
import { Typography, useTheme } from "@mui/material"

export const SuccessMessage = () => {
  const theme = useTheme()

  return (
    <Styled.SuccessMessageContainer>
      <Typography variant={"h2"} sx={{ color: theme.palette.success.main }}>Absorption spectra has been calculated
        ! </Typography>
      <Typography variant={"body1"} fontSize={"medium"} fontWeight={"small"}>Here you can download an archive with
        resulting data and generate plots.</Typography>
    </Styled.SuccessMessageContainer>
  )
}
