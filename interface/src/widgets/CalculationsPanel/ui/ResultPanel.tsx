import React, { useEffect } from "react"
import { useMolecularSpectreData } from "@/entities/MoleculeSpectre/models/MoleculeSpectreContext"
import * as Styled from "./CalculationPanel.styles"
import { Typography } from "@mui/material"
import { Button } from "@/shared/ui"
import { ResultParams, SuccessMessage } from "@/entities/MoleculeSpectre"
import Link from "next/link"
import { SpectreChart } from "@/features/MoleculeSpectre/SpectreChart"

export const ResultPanel = () => {
  const { screenState, setScreenState, zipUrl } = useMolecularSpectreData()

  const handleClickBack = () => {
    setScreenState(0)
  }

  const downloadData = () => {
    !!zipUrl && window.open(zipUrl, "_blank")
  }

  return (
    <>
      {screenState === 1 &&
        <Styled.ResultPanelMainDiv>
          <Button sx={{ alignSelf: "flex-start" }} onClick={handleClickBack} variant={"outlined"}
                  color={"primary"}>Back</Button>
          <Styled.SpectreFormParamsContainer>
            <Typography variant={"h2"}>Parameters</Typography>
            <ResultParams />
          </Styled.SpectreFormParamsContainer>
          <SuccessMessage />
          <Typography sx={{ alignSelf: "center" }} variant={"h2"}>Download Results</Typography>
          <Styled.DownloadDataContainer>
            <Button variant={"contained"} color={"primary"} onClick={downloadData}>Download </Button>
            <Typography variant={"caption"} fontWeight={"medium"} sx={{ fontStyle: "italic" }}>See the <Link
              href={"/format"} target={"_blank"}>data format</Link></Typography>
          </Styled.DownloadDataContainer>
          <Typography sx={{ alignSelf: "center" }} variant={"h2"}>Visualization Options</Typography>
          <SpectreChart />
        </Styled.ResultPanelMainDiv>
      }
    </>
  )
}