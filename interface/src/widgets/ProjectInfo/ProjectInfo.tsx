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
      <Typography color={"primary"} variant={"h3"} sx={{ opacity: 0.8 }}>Molecular atmospheric Absorption with Rapid and Flexible Analysis
        (MARFA)</Typography>
        <Typography variant="body1" fontSize="medium" fontWeight="medium">
            This web application features a lightweight version of the <b>MARFA</b> code. MARFA is a Fortran-based tool
            specifically designed to calculate volume molecular absorption coefficients or monochromatic absorption
            cross-sections, utilizing initial spectroscopic data and a given atmospheric profile.
            For more details, please visit the repository's source code page:{" "}
            <a href="https://github.com/Razumovskyy/MARFA" target="_blank" rel="noopener noreferrer">
                https://github.com/Razumovskyy/MARFA
            </a>
        </Typography>
        <Typography variant="body1" fontSize="medium" fontWeight="medium" gutterBottom>
            The MARFA tool is described in detail in the following scientific paper:{" "}
            <br></br>
            <br></br>
                Razumovskiy, Mikhail, Boris Fomin, and Denis Astanin.
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
                    Mikhail Razumovskiy -{" "}
                    <a
                        href="https://github.com/Razumovskyy"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://github.com/Razumovskyy
                    </a>
                </li>
                <li>
                    Denis Astanin -{" "}
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
      {/*<Styled.FeaturesContainer>*/}
      {/*  <Typography variant={"h4"} color={"black"}>Features:</Typography>*/}
      {/*  <Typography variant={"body1"} fontSize={"medium"} fontWeight={"medium"}>*/}
      {/*    <ul>*/}
      {/*      {features.map((e, index) =>*/}
      {/*        <li key={index} dangerouslySetInnerHTML={{ __html: e }}></li>,*/}
      {/*      )}*/}
      {/*    </ul>*/}
      {/*  </Typography>*/}
      {/*</Styled.FeaturesContainer>*/}
      {/*<Styled.SupportContainer>*/}
      {/*  <Typography variant={"caption"} fontWeight={"medium"} color={"primary"} sx={{ textAlign: "center", opacity: 0.8}}>*/}
      {/*    Website and server incurs costs, and your contribution helps keep it running.<br/>*/}
      {/*    You can support this project financially by clicking the button below.*/}
      {/*  </Typography>*/}
      {/*  <Button disabled={true} onClick={() => {}} variant={"contained"} color={"primary"}>SUPPORT THIS PROJECT</Button>*/}
      {/*</Styled.SupportContainer>*/}
    </Styled.ProjectInfoContainer>
  )
}