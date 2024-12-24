"use client"
import React from "react"
import {
  AutocompleteRenderInputParams,
  TextField as MuiTextField,
  Tooltip as MuiTooltip,
  TextFieldVariants, useTheme,
} from "@mui/material"
import ErrorIcon from "@mui/icons-material/Error"
import { getStyles, tooltipStyle } from "./Textfield.styles"
import { OptionType } from "../Autocomplete/Autocomplete.types"
import { Variant } from "../styles.const"
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form"

interface ITextField {
  id?: string
  name?: string
  label: string
  value?: TitleType
  onChange?: (x: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (x: React.KeyboardEvent<HTMLDivElement>) => void
  helperText?: HelperTextType
  color?: string
  params?: AutocompleteRenderInputParams
  style?: React.CSSProperties
  width?: number
  height?: number
  size?: string
  disabled?: boolean
  multiLine?: boolean
  variant?: TextFieldVariants
  error?: boolean
  borderBottomColor?: string
  disableTooltip?: boolean
}

export type TitleType = string | { value: string | null; label: string; id: number | null } | OptionType | null
type HelperTextType = string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined

const TextField = ({
  id,
  variant = "standard",
  name,
  label,
  onChange,
  value,
  color,
  multiLine,
  borderBottomColor,
  params,
  disabled,
  style,
  size,
  error,
  helperText,
  onKeyDown,
  width,
  height,
  disableTooltip = false,
}: ITextField) => {
  const styles = getStyles(value, style, color, borderBottomColor, width, height, String(helperText))
  const themes = useTheme()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e)
  }

  const HelperText = () => <>{helperText}</>

  return (
    <MuiTooltip
      title={getTitle(value, disableTooltip)}
      placement="left"
      TransitionProps={{ timeout: 300 }}
      enterDelay={200}
      componentsProps={{ tooltip: { sx: tooltipStyle } }}
    >
      <MuiTextField
        error={error}
        helperText={<HelperText />}
        {...params}
        id={id}
        key={id}
        variant={variant}
        name={name}
        label={label}
        value={value}
        onChange={handleChange}
        multiline={multiLine}
        sx={styles}
        disabled={disabled}
        minRows={1}
        fullWidth={variant === Variant.standard}
        className={getSizeClass(size, height)}
        onKeyDown={onKeyDown}
        InputProps={{
          ...params?.InputProps,
        }}
      />
    </MuiTooltip>
  )
}

const getTitle = (value?: TitleType, disableTooltip?: boolean) => {
  if (disableTooltip) return ""
  if (!value) return ""
  // @ts-ignore
  if (value.length <= 20) return ""
  if (typeof value === "string") return value
  // @ts-ignore
  if (value.length <= 30) return ""
  else {
    return value.label
  }
}

const getSizeClass = (value?: string, height?: number) => {
  if (height) return "MuiInputBase-sizeCustom"
  return value ? `MuiInputBase-size${value?.slice(0, 1).toUpperCase()}${value?.slice(1)}` : "MuiInputBase-sizeMedium"
}

export { TextField }
