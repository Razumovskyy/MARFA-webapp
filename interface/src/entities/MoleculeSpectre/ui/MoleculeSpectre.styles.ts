import { styled } from "@mui/material/styles"

export const SuccessMessageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: `${theme.spacing(2)} ${theme.spacing(30)}`,
  border: `1px solid ${theme.palette.success.main}`,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: `${theme.spacing(2)} ${theme.spacing(0)}`,
    alignContent: "center",
    textAlign: "center",
  }
}))