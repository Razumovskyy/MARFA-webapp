"use client"
// @ts-nocheck
import React from "react"
import * as Styled from "./ui/ProjectInfo.styles"
import { Grid, Card, CardContent, useTheme } from "@mui/material"
import { Typography } from "@mui/material"
import { Button, StyledCard } from "@/shared/ui"

export const ProjectInfo = () => {
  // TODO refactor on navigate
  const goToCalculation = () => {
    window.location.href = "/"
  }

  return (
    <Styled.ProjectInfoContainer>
      <StyledCard>
        <Styled.GoToCalculationsContainer>
          <Typography color="primary" variant="h3" textAlign="center">
            Molecular atmospheric Absorption with Rapid and Flexible Analysis (MARFA)
          </Typography>
          <Button onClick={goToCalculation} color="primary" variant="contained" size="large" sx={{ width: "50%" }}>
            Go to calculation
          </Button>
        </Styled.GoToCalculationsContainer>
      </StyledCard>
      <StyledCard>
        <CardContent>
          <Typography variant="body1" fontSize="medium" fontWeight="medium">
            This web application features a lightweight version of the <b>MARFA</b> code. <p /> MARFA is a Fortran-based
            tool specifically designed to calculate volume molecular absorption coefficients or monochromatic absorption
            cross-sections, utilizing initial spectroscopic data and a given atmospheric profile.
            <p />
            To utilize the full capabilities of the model, such as calculating spectra for all atmospheric levels
            simultaneously and applying ꭓ-corrections, we recommend downloading and running the source code available
            at:{" "}
            <a href="https://github.com/Razumovskyy/MARFA" target="_blank" rel="noopener noreferrer">
              https://github.com/Razumovskyy/MARFA
            </a>
          </Typography>
        </CardContent>
      </StyledCard>
      <StyledCard>
        <CardContent>
          <Typography variant="body1" fontSize="medium" fontWeight="medium">
            The <b>MARFA</b> tool is described in detail in the following published article:
            <br />
            <>
              <Typography variant={"body1"} fontSize={"medium"} fontWeight={"small"}>
                Razumovskiy, M., Fomin, B., & Astanin, D. (2025).
                <br/>
                MARFA: An effective line-by-line tool for calculating molecular absorption in planetary atmospheres. Journal of Quantitative Spectroscopy and Radiative Transfer, 346, 109599.
              </Typography>
              <Typography variant={"body1"} fontSize={"medium"} fontWeight={"medium"}>
                <a href={"https://doi.org/10.1016/j.jqsrt.2025.109599"} target={"_blank"}>
                  https://doi.org/10.1016/j.jqsrt.2025.109599
                </a>{" "}
              </Typography>
            </>
          </Typography>
        </CardContent>
      </StyledCard>
      <StyledCard>
        <CardContent>
          <Typography variant="body1" fontSize="medium" fontWeight="medium">
            This platform was developed by:
            <ul>
              <li>
                <b>Mikhail Razumovskiy</b>, scientific researcher and web developer:{" "}
                <a href="https://github.com/Razumovskyy" target="_blank" rel="noopener noreferrer">
                  https://github.com/Razumovskyy
                </a>
                , mrazumovskyy@gmail.com
              </li>
              <li>
                <b>Denis Astanin</b>, full stack developer at Devstark:{" "}
                <a href="https://github.com/DisaAst" target="_blank" rel="noopener noreferrer">
                  https://github.com/DisaAst
                </a>
                , densof161922@gmail.com
              </li>
            </ul>
          </Typography>
        </CardContent>
      </StyledCard>
    </Styled.ProjectInfoContainer>
  )
}
