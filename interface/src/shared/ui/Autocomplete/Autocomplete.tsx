"use client"
import { AutocompleteRenderInputParams, Autocomplete as MuiAutocomplete } from "@mui/material"
import { TextField } from "@/shared/ui"
import { AutocompleteEvent, IAutocomplete, OptionType } from "./Autocomplete.types"
import { IStyle, Size } from "../styles.const"

const getStyles = (width?: string | number, style?: IStyle) => ({
  minWidth: width,
  width: "100%",
  ".MuiSvgIcon-fontSizeMedium": {
    scale: "1.5",
  },
  ...style,
})

export const Autocomplete = ({
  id,
  key,
  name,
  value,
  options,
  onChange,
  filterChange,
  label,
  size = Size.medium,
  width,
  disabled,
  style,
  onReset,
  error,
  errorMessage,
}: IAutocomplete) => {
  const handleChange = (e: AutocompleteEvent, value: OptionType | null | string) => {
    if (typeof value === "string") return
    if ((value === null || value?.id === null) && onReset)
      return onReset({ target: { value: "", name: name || "", label: "" } })
    onChange && onChange(e, value, name || "")
    // @ts-ignore
    filterChange && filterChange({ target: { value: value?.id, name: name || "", label: value?.label } })
  }

  const handleNullableValue = (params: AutocompleteRenderInputParams) => {
    const newValue = params.inputProps.value === "Не выбрано" ? "" : params.inputProps.value
    return {
      ...params,
      inputProps: { ...params.inputProps, value: newValue },
    }
  }

  return (
    <MuiAutocomplete
      key={key || id}
      id={id}
      value={value}
      onChange={handleChange}
      options={options}
      disabled={disabled}
      clearText=""
      openText=""
      closeText=""
      noOptionsText="Нет опций для выбора"
      renderInput={(params: AutocompleteRenderInputParams) => {
        return (
          <TextField
            name={name}
            error={!!error}
            // @ts-ignore
            helperText={errorMessage as string}
            params={handleNullableValue(params)}
            variant="outlined"
            value={value}
            label={label}
            size={size}
            style={getStyles(width, style)}
            disabled={disabled}
          />
        )
      }}
    />
  )
}
