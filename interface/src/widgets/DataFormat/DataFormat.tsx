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
      <Typography>The sample file is as follows:</Typography>
      <Image style={{ alignSelf: "center", borderRadius: "4px"}} src={ImageDescription} alt={"Data image"}/>
      <Typography>1st – <b>the title/comment</b> <br/>
        2nd column – <b>height</b> in km<br/>
        3rd column – <b>pressure</b> in bars or atmospheres (pressure range from 0 to 100 bar)<br/>
        4th column – <b>temperature</b> in Kelvins (temperature range from 0 to 1000 K)<br/>
        <p></p>
        If you calculate volume absorption coefficient, the 4th column is needed, otherwise live this column empty.<br/>
        5th column – <b>molecule</b> concentration in the given layer in mol/(cm² * km)</Typography>
    </Styled.AboutDataContainer>
  )
}