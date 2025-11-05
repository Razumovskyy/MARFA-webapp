import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import { Header } from "@/widgets"
import { StyledEngineProvider, ThemeProvider } from "@mui/material"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"
import useTheme from "@/shared/theme/useTheme"

export const metadata: Metadata = {
  title: "MARFA",
  description: "Molecular atmospheric Absorption with Rapid and Flexible Analysis (MARFA)",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    shortcut: ["/favicon.ico"]
  }
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
//test
  const theme = useTheme

  return (
    <html lang="en">
    {/* Google Analytics */}
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=G-NH8RY5NPS2"
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-NH8RY5NPS2');
      `}
    </Script>
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
