import {
  deepOrange as colorDeepOrange,
  pink as colorPink,
} from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export default createTheme({
  palette: {
    primary: {
      main: colorDeepOrange[500],
    },
    secondary: {
      main: colorPink[600],
    },
  },
})
