import { ReactNode } from "react"
import { ColorType, SizeType, VariantType } from "../styles.const"

export interface IButton {
  id?: string
  children: ReactNode
  onClick: () => void
  variant?: VariantType
  color?: ColorType
  height?: SizeType
  size?: SizeType
  disabled?: boolean
  sx?: React.CSSProperties
  component?: any
  href?: string
  startIcon?: ReactNode
  endIcon?: ReactNode
  isHovered?: boolean
  width?: number | string
}
