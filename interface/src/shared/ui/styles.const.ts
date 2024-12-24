export interface IStyle {
  [x: string]: string | number
}

export enum Variant {
  contained = "contained",
  standard = "standard",
  outlined = "outlined"
}

export enum Color {
  primary = "primary",
  error = "error",
}

export enum Size {
  small = "small",
  medium = "medium",
  large = "large",
}

export type SizeType = Extract<keyof typeof Size, "small" | "medium" | "large">
export type VariantType = keyof typeof Variant
export type ColorType = keyof typeof Color
