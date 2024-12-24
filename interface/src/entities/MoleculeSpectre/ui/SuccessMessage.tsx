import React from "react"
import * as Styled from "./MoleculeSpectre.styles"
import { Typography, useTheme } from "@mui/material"
export const SuccessMessage = () => {
  const theme = useTheme()

  return (
    <Styled.SuccessMessageContainer>
      <Typography sx={{ color: theme.palette.success.main}}>The data has been calculated!</Typography>
      <Typography>Here you can plot, check and download your results.</Typography>
    </Styled.SuccessMessageContainer>
  )
}
