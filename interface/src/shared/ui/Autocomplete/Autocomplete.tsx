import { AutocompleteRenderInputParams, Autocomplete as MuiAutocomplete } from "@mui/material"
import { TextField } from "../TextField/TextField"
import { AutocompleteEvent, IAutocomplete, OptionType } from "./Autocomplete.types"
import { IStyle, Size } from "../styles.const"
import * as React from "react"

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
      // @ts-ignore
      onChange={handleChange}
      options={options}
      disabled={disabled}
      disableClearable={!onReset}
      clearText=""
      openText=""
      closeText=""
      noOptionsText="Нет опций для выбора"
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          name={name}
          error={!!error}
          // @ts-ignore
          helperText={errorMessage}
          params={handleNullableValue(params)}
          variant="outlined"
          value={value}
          label={label}
          size={size}
          style={getStyles(width, style)}
          disabled={disabled}
          disableTooltip={true}
        />
      )}
      renderOption={(props, _, state) => (
        <li
          {...props}
          aria-selected={state.inputValue === props.key}
          style={{
            backgroundColor: state.inputValue === props.key ? "#DEE7F2" : "#F9F9F9",
            cursor: "pointer",
            transition: "background-color 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#efefef")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = state.inputValue === props.key ? "#DEE7F2" : "#F9F9F9")}
        >
          {props.key}
        </li>
      )}
    />
  )
}