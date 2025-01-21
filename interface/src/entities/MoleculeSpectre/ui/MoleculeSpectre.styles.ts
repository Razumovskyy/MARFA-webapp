import { styled } from "@mui/material/styles"

export const SuccessMessageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(1),
  backgroundColor: theme.palette.background.default,
  padding: `${theme.spacing(2)} ${theme.spacing(30)}`,
  border: `${theme.spacing(1)} solid ${theme.palette.success.main}`,
  borderRadius: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: `${theme.spacing(2)} ${theme.spacing(0)}`,
    alignContent: "center",
    textAlign: "center",
  }
}))

export const ParamsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2)
}))

export const ParamContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(1),
  alignItems: "baseline"
}))