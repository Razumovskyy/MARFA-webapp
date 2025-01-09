import { Button } from "@/shared/ui"
import { Typography } from "@mui/material"
import Image from "next/image"
import ImageDescription from "@/images/data_description.png"
import * as Styled from "./ui/DataFormat.styles"
import React from "react"

export const DataFormat = () => {
  return (
    <Styled.AboutDataContainer>
      <Typography color={"primary"} variant={"h3"} sx={{ opacity: 0.8, alignSelf: "center" }}>Data format</Typography>
    </Styled.AboutDataContainer>
  )
}