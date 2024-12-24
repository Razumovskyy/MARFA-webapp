"use client"
//@ts-nocheck
import React from "react"
import * as Styled from "./ui/ProjectInfo.styles"
import { Button } from "@/shared/ui"
import { Typography } from "@mui/material"
import { features } from "@/widgets/ProjectInfo/static/Features"

export const ProjectInfo = () => {

  const goToCalculation = () => {
    window.location.href = "/"
  }

  return (
    <Styled.ProjectInfoContainer>
      <Button onClick={goToCalculation} color={"primary"} variant={"contained"}>Go to calculation</Button>
      <Typography color={"primary"} variant={"h3"} sx={{ opacity: 0.8 }}>Molecular Absorption with Rapid and Flexible Analysis
        (MARFA)</Typography>
      <Typography variant={"body1"} fontSize={"medium"} fontWeight={"medium"}><b>MARFA</b> is a Fortran-based tool
        designed for calculating volume molecular absorption coefficients or
        monochromatic absorption cross-sections based on initial spectroscopic data and a given atmospheric profile.
        Originally developed to facilitate modeling of radiative transfer in Venus's atmosphere, its flexible design
        permits adaptation to various spectroscopic and atmospheric scenarios.
      </Typography>
      <Styled.FeaturesContainer>
        <Typography variant={"h4"} color={"black"}>Features:</Typography>
        <Typography variant={"body1"} fontSize={"medium"} fontWeight={"medium"}>
          <ul>
            {features.map((e, index) =>
              <li key={index} dangerouslySetInnerHTML={{ __html: e }}></li>,
            )}
          </ul>
        </Typography>
      </Styled.FeaturesContainer>
      <Styled.SupportContainer>
        <Typography variant={"caption"} fontWeight={"medium"} color={"primary"} sx={{ textAlign: "center", opacity: 0.8}}>
          Website and server incurs costs, and your contribution helps keep it running.<br/>
          You can support this project financially by clicking the button below.
        </Typography>
        <Button disabled={true} onClick={() => {}} variant={"contained"} color={"primary"}>SUPPORT THIS PROJECT</Button>
      </Styled.SupportContainer>
    </Styled.ProjectInfoContainer>
  )
}