import React from "react"
import { useMolecularSpectreData } from "@/entities/MoleculeSpectre/models/MoleculeSpectreContext"
import * as Styled from "./CalculationPanel.styles"
import { Typography } from "@mui/material"
import { Button } from "@/shared/ui"
import { SuccessMessage } from "@/entities/MoleculeSpectre"
import Link from "next/link"
import { SpectreChart } from "@/features/MoleculeSpectre/SpectreChart"

export const ResultPanel = () => {
  const { screenState, setScreenState, zipUrl, id, setZipUrl } = useMolecularSpectreData()

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
          <SuccessMessage />
          <SpectreChart />
          <Styled.DownloadDataContainer>
            <Button variant={"contained"} color={"primary"} onClick={downloadData}>DOWNLOAD ALL PT-tables</Button>
            <Typography variant={"caption"} fontWeight={"medium"} sx={{ fontStyle: "italic" }}>See the <Link
              href={"/format"}>data format</Link></Typography>
          </Styled.DownloadDataContainer>
          {/*<Typography sx={{ fontStyle: "italic", color: "#1E4E79", alignSelf: "center" }} variant={"caption"}*/}
          {/*            fontWeight={"large"}>*/}
          {/*  *With a large number of levels, file loading may take several minutes.*/}
          {/*</Typography>*/}
        </Styled.ResultPanelMainDiv>
      }
    </>
  )
}