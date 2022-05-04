import {
  blue as colorBlue,
  deepOrange as colorDeepOrange,
  pink as colorPink,
} from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export default createTheme({
  palette: {
    primary: {
      main: colorBlue[500],
    },
    secondary: {
      main: colorDeepOrange[500],
    },
    error: {
      main: colorPink[500],
    },
  },
})
