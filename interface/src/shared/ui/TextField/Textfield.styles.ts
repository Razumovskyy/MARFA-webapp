"use client"
import themes from "@/shared/theme/useTheme"
import { TitleType } from "./TextField"

export const getStyles = (
  value?: TitleType,
  style?: React.CSSProperties,
  color?: string,
  borderBottomColor?: string,
  width?: number,
  height?: number,
  helperText?: string
) => ({
  color: color,
  minWidth: width ? `${width}px` : "auto",
  borderBottom: `1px solid ${borderBottomColor}`,
  "& .MuiOutlinedInput-notchedOutline ": {
    top: 0,
  },
  "& legend": { display: "none" },
  "& .MuiInputLabel-root": {
    top: value ? -13 : -6,
    left: value && -12,
    fontSize: value ? "1.1625rem" : "16px",
    color: color || themes.palette.additional.main,
    "&.Mui-focused": {
      top: -13,
      left: -12,
      fontSize: "1.1625rem",
      color: color || themes.palette.additional.main,
    },
  },
  "& .MuiInputBase-root": {
    paddingBlock: "2px 2px",
    borderRadius: "12px",
    "& .MuiInputBase-input": {
      color: color,
      minHeight: height && `${height}px!important`,
    },
    "& fieldset": {
      borderColor: themes.palette.additional.light,
    },
  },
  "& .Mui-focused": {
    "& fieldset": {
      borderWidth: "5px solid",
    },
    "& .MuiOutlinedInput-notchedOutline ": {
      border: `1px solid ${themes.palette.primary.main}!important`,
    },
  },
  "& .Mui-disabled": {
    color: `${themes.palette.additional.gray}!important`,
    "& fieldset": {
      backgroundColor: themes.palette.text.disabled,
      height: height && `${height}px`,
      border: "none",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  "&.MuiInputBase-sizeLarge_x": {
    "& div": {
      height: themes.spacing(16),
    },
    "& .MuiInputLabel-root": {
      top: value ? -13 : 5,
      "&.Mui-focused": {
        top: -13,
      },
    },
  },
  "&.MuiInputBase-sizeLarge": {
    "& div": {
      borderRadius: themes.spacing(3),
      height: themes.spacing(12),
    },
    "& .MuiInputLabel-root": {
      top: value ? -13 : -3,
      "&.Mui-focused": {
        top: -13,
      },
    },
  },
  "&.MuiInputBase-sizeMedium": {
    "& div": {
      borderRadius: themes.spacing(2),
      height: themes.spacing(10),
    },
  },
  "&.MuiInputBase-sizeSmall": {
    "& div": {
      borderRadius: themes.spacing(2),
      height: themes.spacing(8),
    },
    "& .MuiInputBase-input": {
      fontSize: "14px",
      padding: "4.5px 4px 7.5px 5px",
    },
    "& .MuiInputLabel-root": {
      top: value ? -13 : -11,
      "&.Mui-focused": {
        top: -13,
      },
    },
  },
  "&.MuiInputBase-sizeCustom": {
    height: "auto",
    "& div fieldset": {
      height: "auto",
      minHeight: `${height}px`,
    },
  },
  "&.MuiTextField-root": {
    minHeight: height && `${height}px`,
    "& .MuiFormHelperText-root": {
      position: "absolute",
      bottom: getErrorIndent(helperText),
      left: "-14px",
      textWrap: "nowrap",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: `1px solid ${themes.palette.primary.main}`,
    },
  },
  ...style,
})

const getErrorIndent = (text?: string) => {
  if (!text) return
  const length = text?.length
  if (length < 56) return "-22px"
  return "-22px"
}

export const tooltipStyle = {
  position: "absolute",
  left: themes.spacing(8),
  top: themes.spacing(1.5),
  padding: themes.spacing(1.5),
  bgcolor: themes.palette.additional.lightBlue,
  fontSize: themes.spacing(4),
  fontWeight: "400",
  lineHeight: themes.spacing(5),
  textWrap: "wrap",
  color: "black",
  maxWidth: "600px",
}
