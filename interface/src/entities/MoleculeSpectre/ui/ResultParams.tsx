import React from "react"
import { useMolecularSpectreData } from "@/entities/MoleculeSpectre/models/MoleculeSpectreContext"
import { resultParams } from "@/entities/MoleculeSpectre"
import { Typography } from "@mui/material"
import * as Styled from "./MoleculeSpectre.styles"
import { StyledCard, StyledCardContent } from "@/shared/ui"
import { getUnitsTargetValue } from "@/entities/MoleculeSpectre/lib/util"

export const ResultParams = () => {
  const { spectreData } = useMolecularSpectreData()

  return (
    <StyledCard>
      <StyledCardContent>
        <Typography variant={"h2"} sx={{ alignSelf: "center" }}>Parameters</Typography>
        <Styled.ParamsContainer>
          <Styled.ParamContainer>
            <Typography variant={"body1"} fontSize={"medium"}
                        fontWeight={"small"} sx={{ width: "fit-content" }}>Resolution:</Typography>
            <Typography variant={"body1"} fontSize={"medium"} fontWeight={"medium"}
                        sx={{ width: "fit-content" }}>{`5 * 10`}<sup>-4</sup></Typography>
            <Typography variant={"caption"} fontSize={"small"} fontWeight={"small"}
                        sx={{ width: "fit-content" }}>{`cm⁻¹`}</Typography>
          </Styled.ParamContainer>
          {resultParams.map(e =>
            <Styled.ParamContainer key={e.id}
                                   sx={e.value === "density" ? { display: spectreData["target_value"] === "volume absorption coefficient" ? "visible" : "none" } : {}}>
              <Typography variant={"body1"} fontSize={"medium"}
                          fontWeight={"small"} sx={{ width: "fit-content" }}>{e.label}:</Typography>
              <Typography variant={"body1"} fontSize={"medium"} fontWeight={"medium"}
                          sx={{ width: "fit-content" }}>{`${spectreData[e.value]}`}</Typography>
              <Typography variant={"caption"} fontSize={"small"} fontWeight={"small"}
                          sx={{ width: "fit-content" }}
                          dangerouslySetInnerHTML={{ __html: e.value === "target_value" ? getUnitsTargetValue(spectreData[e.value]) : e.units }}></Typography>
            </Styled.ParamContainer>,
          )}
        </Styled.ParamsContainer>
      </StyledCardContent>
    </StyledCard>
  )
}