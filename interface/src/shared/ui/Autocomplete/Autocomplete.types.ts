import { TitleType } from "../TextField/TextField"
import { IStyle, SizeType } from "../styles.const"
import { SyntheticEvent } from "react"

export interface IAutocomplete {
  id?: string
  key?: string | number
  options: TitleType[]
  onChange?: (e: AutocompleteEvent, value: OptionType | null, name: string) => void
  filterChange?: (e: { target: { value: string | number; name: string; label: string } }) => void
  name?: string
  value?: TitleType
  label: string
  size?: SizeType
  width?: number | string
  disabled?: boolean
  style?: IStyle
  onReset?: (e: { target: { value: string | number; name: string; label: string } }) => void
  error?: unknown
  errorMessage?: unknown
}

export type OptionType = {
  [x: string]: string | number
}

export type AutocompleteEvent = SyntheticEvent<Element, Event>
