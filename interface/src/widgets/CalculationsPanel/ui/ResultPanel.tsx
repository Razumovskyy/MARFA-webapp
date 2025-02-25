import React from "react"
import { useMolecularSpectreData } from "@/entities/MoleculeSpectre/models/MoleculeSpectreContext"
import * as Styled from "./CalculationPanel.styles"
import { Typography } from "@mui/material"
import { Button, StyledCard, StyledCardContent } from "@/shared/ui"
import { ResultParams, SuccessMessage } from "@/entities/MoleculeSpectre"
import Link from "next/link"
import { SpectreChart } from "@/features/MoleculeSpectre/SpectreChart"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"

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
          <Button startIcon={<ArrowBackIcon />} sx={{ alignSelf: "flex-start" }} onClick={handleClickBack}
                  variant={"outlined"}
                  color={"primary"}>Back</Button>
          <SuccessMessage />
          <Styled.CardsDiv>
            <ResultParams />
            <StyledCard sx={{ height: "95.485%" }}>
              <StyledCardContent>
                <Typography sx={{ alignSelf: "center" }} variant={"h2"}>Download Results</Typography>
                <Styled.DownloadDataContainer>
                  <Button startIcon={<ArrowDownwardIcon />} variant={"contained"} color={"primary"}
                          onClick={downloadData}>Download </Button>
                  <Typography variant={"caption"} fontWeight={"medium"} sx={{ fontStyle: "italic" }}>See the <Link
                    href={"/format"} target={"_blank"}>data format</Link></Typography>
                </Styled.DownloadDataContainer>
                <Typography variant={"body1"} fontSize={"medium"} fontWeight={"medium"}>
                  The downloaded archive includes: <br />
                  <b>info.txt:</b> Metadata about the calculation, including input parameters.<br />
                  <b>pt-table.ptbin:</b> Binary absorption data. See documentation for structure details.<br />
                  <b>output.dat:</b> Absorption data in a readable format (large file size may occure because of high
                  resolution).<br />
                  <b>stderr.log:</b> Standard error output from MARFA.<br />
                  <b>stdout.log:</b> Standard output from MARFA.
                </Typography>
              </StyledCardContent>
            </StyledCard>
          </Styled.CardsDiv>
          <StyledCard>
            <StyledCardContent sx={{ alignItems: "center" }}>
              <Typography sx={{ alignSelf: "center" }} variant={"h2"}>Visualization Options</Typography>
              <SpectreChart />
            </StyledCardContent>
          </StyledCard>
        </Styled.ResultPanelMainDiv>
      }
    </>
  )
}