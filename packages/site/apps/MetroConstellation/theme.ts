import {
  deepOrange as colorDeepOrange,
  blue as colorBlue,
} from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export default createTheme({
  palette: {
    primary: {
      main: colorDeepOrange[500],
    },
    secondary: {
      main: colorBlue[500],
    },
  },
})
