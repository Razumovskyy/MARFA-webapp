"use client"
import { Button as MuiButton } from "@mui/material"
import { styled } from "@mui/material/styles"
import { IButton } from "./Button.types"
import { Theme } from "@mui/system"
import { memo } from "react"

export const Button = memo((props: IButton) => {
  const {
    children,
    onClick,
    variant,
    color,
    height,
    disabled,
    sx,
    // component,
    href,
    startIcon,
    endIcon,
    width,
    id,
  } = props
  const StyledButton = styled(MuiButton)(
    ({
       theme,
       isHovered,
       width,
       sx,
     }: {
      theme?: Theme
      isHovered?: boolean
      width?: string | number
      sx?: React.CSSProperties
    }) => ({
      width: width,
      boxShadow: "none",
      "&.MuiButtonBase-root": {
        textWrap: "nowrap",
      },
      "&.MuiButton-containedPrimary": {
        boxShadow: "none",
        color: theme?.palette.primary.contrastText,
        backgroundColor: isHovered ? theme?.palette.primary.dark : theme?.palette.primary.main,
        "&:hover": {
          backgroundColor: theme?.palette.primary.dark,
          boxShadow: "none",
        },
        "&:disabled": {
          opacity: 0.5,
          background: theme?.palette.primary.light,
          boxShadow: "none",
        },
      },
      "&.MuiButton-outlinedPrimary": {
        border: `1px solid ${theme?.palette.primary.dark}`,
        color: theme?.palette.secondary.contrastText,
        backgroundColor: theme?.palette.common.white,
        "&:hover": {
          backgroundColor: theme?.palette.secondary.dark,
          border: `1px solid ${theme?.palette.primary.dark}`,
        },
        "&:disabled": {
          opacity: 0.6,
        },
      },
      "&.MuiButton-invertPrimary": {
        border: `1px solid ${theme?.palette.common.white}`,
        color: theme?.palette.primary.contrastText,
        backgroundColor: theme?.palette.primary.main,
        "&:hover": {
          backgroundColor: theme?.palette.primary.dark,
        },
        "&:disabled": {
          background: theme?.palette.primary.light,
        },
      },
      "&.MuiButton-containedAccent": {
        color: theme?.palette.accent.contrastText,
        backgroundColor: theme?.palette.accent.main,
        "&:hover": {
          color: theme?.palette.accent.main,
          backgroundColor: theme?.palette.common.white,
          border: `1px solid ${theme?.palette.accent.main}`,
          boxShadow: "none",
        },
        "&:disabled": {
          background: theme?.palette.accent.light,
        },
      },
      "&.MuiButton-outlinedAccent": {
        border: `1px solid ${theme?.palette.accent.invert.contrastText}`,
        color: theme?.palette.accent.invert.contrastText,
        backgroundColor: theme?.palette.accent.invert.main,
        "&:hover": {
          backgroundColor: theme?.palette.accent.invert.contrastText,
          color: theme?.palette.accent.invert.main,
          border: `none`,
        },
        "&:disabled": {
          background: theme?.palette.accent.invert.main,
          border: `1px solid ${theme?.palette.accent.invert.light}`,
          color: theme?.palette.accent.invert.light,
        },
      },
      "&.MuiButton-containedAdditional": {
        color: theme?.palette.additional.contrastText,
        backgroundColor: theme?.palette.additional.main,
        "&:hover": {
          backgroundColor: theme?.palette.additional.dark,
        },
        "&:disabled": {
          background: theme?.palette.accent.light,
        },
      },
      "&.MuiButton-outlinedAdditional": {
        border: sx?.border || `1px solid ${theme?.palette.additional.main}`,
        color: theme?.palette.additional.invert.contrastText,
        backgroundColor: theme?.palette.common.white,
        "&:hover": {
          backgroundColor: theme?.palette.additional.invert.dark,
        },
        "&:disabled": {
          color: theme?.palette.additional.invert.light,
          border: `1px solid ${theme?.palette.additional.invert.light}`,
        },
      },
      "&.MuiButton-outlinedError ": {
        border: `1px solid ${theme?.palette.error.main}`,
        color: theme?.palette.text.error,
        backgroundColor: "transparent",
        "&:hover": {
          borderColor: theme?.palette.error.dark,
          color: theme?.palette.error.dark,
          backgroundColor: theme?.palette.accent.light,
        },
        "&:disabled": {
          border: `1px solid ${theme?.palette.accent.light}`,
          color: theme?.palette.accent.light,
          backgroundColor: theme?.palette.background.paper,
        },
      },
      "&.MuiButton-sizeLarge_x": {
        borderRadius: theme?.spacing(3),
        height: theme?.spacing(16),
      },
      "&.MuiButton-sizeLarge": {
        height: theme?.spacing(12),
        fontSize: theme?.spacing(5),
        paddingLeft: theme?.spacing(8),
        paddingRight: theme?.spacing(8),
        borderRadius: theme?.spacing(3),
      },
      "&.MuiButton-sizeMedium": {
        borderRadius: theme?.spacing(2),
        height: theme?.spacing(10),
        paddingLeft: theme?.spacing(6),
        paddingRight: theme?.spacing(6),
      },
      "&.MuiButton-sizeSmall": {
        borderRadius: theme?.spacing(2),
        height: theme?.spacing(8),
        paddingLeft: theme?.spacing(4),
        paddingRight: theme?.spacing(4),
      },
      "&.MuiButtonBase-root > span": {
        paddingBottom: "3px",
      },
      ...sx,
    }),
  )

  return (
    <StyledButton
      id={id}
      // TODO посмотреть, используется ли это поле
      // component={component}
      href={href}
      // @ts-ignore
      variant={variant}
      color={color}
      size={height}
      onClick={onClick}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      width={width}
      sx={sx}
    >
      {children}
    </StyledButton>
  )
})
