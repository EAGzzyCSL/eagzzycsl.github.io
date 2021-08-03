import {
  deepOrange as colorDeepOrange,
  teal as colorTeal,
} from '@material-ui/core/colors'
import { createTheme } from '@material-ui/core/styles'

export default createTheme({
  palette: {
    type: 'light',
    primary: {
      main: colorDeepOrange[500],
    },
    secondary: {
      main: colorTeal[600],
    },
  },
})
