import React from "react"
import { useMolecularSpectreData } from "@/entities/MoleculeSpectre/models/MoleculeSpectreContext"
import { resultParams } from "@/entities/MoleculeSpectre"
import { Typography } from "@mui/material"

export const ResultParams = () => {
  const { spectreData } = useMolecularSpectreData()

  return (
    <div>
      {resultParams.map(e =>
        <Typography key={e.id}>{e.label}: {`${spectreData[e.value]} ${e.units}`}</Typography>
      )}
    </div>
  )
}