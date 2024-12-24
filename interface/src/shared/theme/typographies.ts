import { Roboto } from "next/font/google"

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default {
  typography: {
    fontFamily: roboto.style.fontFamily,
    fontSizeLarge: "1.25rem",
    fontSizeMedium: "1.125rem",
    fontSizeSmall: "1rem",
    fontWeightLarge: "500",
    fontWeightMedium: "400",
    fontWeightSmall: "300",
    fontStyle: "normal",
    h1: {
      color: "#313439",
      fontSize: 42,
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: "115%",
    },
    h2: {
      color: "#313439",
      fontSize: 30,
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: "115%",
    },
    h3: {
      color: "#313439",
      fontSize: 24,
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "115%",
    },
    h4: {
      color: "#313439",
      fontSize: 18,
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "115%",
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: "1.875rem",
      lineHeight: 1.25,
      letterSpacing: "0.015em",
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: "1.5rem",
      lineHeight: 1.25,
      letterSpacing: "0.03em",
      textTransform: "uppercase",
    },
    subtitle3: {
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: 1.25,
      letterSpacing: "0.015em",
    },
    caption: {
      color: "#313439",
      fontSize: "0.85rem",
      lineHeight: 1.25,
      letterSpacing: "0.001em",
    },
    body1: {
      lineHeight: 1.55,
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.85rem",
      lineHeight: 1.55,
    },
    button: {
      fontSize: 16,
      fontStyle: "normal",
      fontWeight: 400,
      textTransform: "uppercase",
      paddingLeft: 24,
      paddingRight: 24,
    },
  },
}
