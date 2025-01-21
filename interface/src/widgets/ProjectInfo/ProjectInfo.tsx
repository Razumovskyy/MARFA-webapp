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
      <Typography color={"primary"} variant={"h3"} sx={{ opacity: 0.8 }}>Molecular Atmospheric Absorption with Rapid and Flexible Analysis
        (MARFA)</Typography>
        <Typography variant="body1" fontSize="medium" fontWeight="medium">
            This web application features a lightweight version of the <b>MARFA</b> code. MARFA is a Fortran-based tool
            specifically designed to calculate volume molecular absorption coefficients or monochromatic absorption
            cross-sections, utilizing initial spectroscopic data and a given atmospheric profile.
            To utilize the full capabilities of the model, such as calculating spectra for all atmospheric levels
            simultaneously and applying ꭓ-corrections, we recommend downloading and running the source code available at:{" "}
            <a href="https://github.com/Razumovskyy/MARFA" target="_blank" rel="noopener noreferrer">
                https://github.com/Razumovskyy/MARFA
            </a>
        </Typography>
        <Typography variant="body1" fontSize="medium" fontWeight="medium" gutterBottom>
            The MARFA tool is described in detail in the following preprint:{" "}
            <br></br>
            <br></br>
                Razumovskiy Mikhail, Boris Fomin, and Denis Astanin.
                <a
                    href="https://arxiv.org/abs/2411.03418"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {" "}<i>MARFA: An Effective Line-by-line Tool for Calculating Absorption Coefficients and Cross-sections in
                    Planetary Atmospheres</i>
                </a>.
                arXiv preprint arXiv:2411.03418 (2024).
        </Typography>
        <Typography variant="body1" fontSize="medium" fontWeight="medium" sx={{ alignSelf: "flex-start"}}>
            This platform was developed by:
            <ul>
                <li>
                    <b>Mikhail Razumovskiy</b>, scientific researcher and web developer:{" "}
                    <a
                        href="https://github.com/Razumovskyy"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://github.com/Razumovskyy
                    </a>{", "}
                    mrazumovskyy@gmail.com
                </li>
                <li>
                    <b>Denis Astanin</b>, web developer at BiTronics Lab:{" "}
                    <a
                        href="https://github.com/BitronicsDev"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://github.com/BitronicsDev
                    </a>
                </li>
            </ul>
        </Typography>
    </Styled.ProjectInfoContainer>
  )
}