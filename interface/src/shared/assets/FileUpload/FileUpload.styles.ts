import { styled } from "@mui/material/styles"
import { Button } from "@mui/material"

export const FileButton = styled(Button)(({ theme }) => ({
  color: "#000",
  fontFamily: "Roboto",
  fontSize: 16,
  fontStyle: "normal",
  fontWeight: 300,
  paddingLeft: 0,
  paddingRight: 0,
  "&:hover": {
    background: "#00000000",
  },
}))

export const FileUploadedButton = styled(Button)(({ theme }) => ({
  color: "#000",
  fontSize: 14,
  fontStyle: "normal",
  fontWeight: 300,
  paddingLeft: 0,
  paddingRight: 0,
  lineHeight: "125%",
  borderBottom: "1px solid #000",
  borderBottomRightRadius: 0,
  borderBottomLeftRadius: 0,
  "&:hover": {
    background: "#00000000",
  },
}))

export const FileUploadedContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(4),
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    gap: 4,
  }
}))