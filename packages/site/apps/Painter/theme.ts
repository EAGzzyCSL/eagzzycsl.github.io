import {
  green as colorGreen,
  orange as colorOrange,
} from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export default createTheme({
  palette: {
    primary: {
      main: colorOrange[800],
    },
    secondary: {
      main: colorGreen[600],
    },
  },
})
