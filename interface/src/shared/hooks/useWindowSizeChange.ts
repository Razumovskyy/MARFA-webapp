import { useState, useEffect } from "react"
import { useTheme } from "@mui/material"


export function useWindowSizeChange() {
  const theme = useTheme()
  const [width, setWidth] = useState<"xs" | "sm" | "md" | "lg" | "xl" | null>(null)
  const [isSmall, setIsSmall] = useState<boolean | null>(null)

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth
      if (windowWidth < theme.breakpoints.values.md) setIsSmall(true)
      else setIsSmall(false)
      let newSize: "xs" | "sm" | "md" | "lg" | "xl" | null = null
      if (windowWidth >= theme.breakpoints.values.xl) {
        newSize = "xl"
      } else if (windowWidth >= theme.breakpoints.values.lg) {
        newSize = "lg"
      } else if (windowWidth >= theme.breakpoints.values.md) {
        newSize = "md"
      } else if (windowWidth >= theme.breakpoints.values.sm) {
        newSize = "sm"
      } else {
        newSize = "xs"
      }
      setWidth(newSize)
    }
    handleResize() // Вызываем обработчик изменения размера окна при монтировании компонента
    window.addEventListener("resize", handleResize) // Добавляем слушатель события изменения размера окна
    return () => {
      window.removeEventListener("resize", handleResize) // Удаляем слушатель события при размонтировании компонента
    }
  }, [theme.breakpoints.values])

  return { width, isSmall }
}
