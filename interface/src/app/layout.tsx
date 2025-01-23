import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/widgets"
import { StyledEngineProvider, ThemeProvider } from "@mui/material"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"
import useTheme from "@/shared/theme/useTheme"

export const metadata: Metadata = {
  title: "MARFA",
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {

  const theme = useTheme

  return (
    <html lang="en">
    <head>
      <link rel="icon" href="/public/favicon.ico" sizes="any" />
      <title>MARFA</title>
    </head>
    <StyledEngineProvider injectFirst>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={theme}>
          <Header />
          <body style={{
            backgroundColor: "#f9f9f9",
          }}>{children}</body>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </StyledEngineProvider>
    </html>
  )
}
