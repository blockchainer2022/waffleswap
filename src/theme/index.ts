import { black, green, grey, red, white, waffle } from './colors'

const theme = {
  borderRadius: 12,
  breakpoints: {
    mobile: 400,
  },
  color: {
    waffle,
    black,
    grey,
    primary: {
      light: red[200], // red
      main: red[100], // red
    },
    secondary: {
      main: green[500],
    },
    white,
  },
  siteWidth: 1200,
  spacing: {
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
    7: 64,
  },
  topBarSize: 70 // 72
}

export default theme