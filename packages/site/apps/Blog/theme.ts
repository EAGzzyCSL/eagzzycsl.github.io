import {
  deepOrange as colorDeepOrange,
  teal as colorTeal,
} from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export default createTheme({
  palette: {
    primary: {
      main: colorDeepOrange[500],
    },
    secondary: {
      main: colorTeal[600],
    },
  },
})
