import * as Styled from "./ui/Header.styles"
import Logo from "@/images/MarkLogo.svg"
import { Typography } from "@mui/material"
import Link from "next/link"

export const Header = () => {
  return (
    <Styled.StyledAppBar>
      <Styled.StyledToolbar>
        <Styled.LogoContainer href={"/"}>
          <Styled.StyledImage src={Logo} />
          <Styled.ProjectName variant={"h2"} fontWeight={"medium"}>MARFA</Styled.ProjectName>
        </Styled.LogoContainer>
        <Styled.FeaturesContainer>
          <Link href={"/"}>
            <Typography variant={"body1"} fontSize={"medium"} fontWeight={"large"}>Home</Typography>
          </Link>
          <Styled.VerticalLine>|</Styled.VerticalLine>
          <Link href={"/format"}>
            <Typography variant={"body1"} fontSize={"medium"} fontWeight={"large"}>Data format</Typography>
          </Link>
          <Styled.VerticalLine>|</Styled.VerticalLine>
          <Link href={"/about"}>
            <Typography variant={"body1"} fontSize={"medium"} fontWeight={"large"}>About</Typography>
          </Link>
        </Styled.FeaturesContainer>
      </Styled.StyledToolbar>
    </Styled.StyledAppBar>
  )
}