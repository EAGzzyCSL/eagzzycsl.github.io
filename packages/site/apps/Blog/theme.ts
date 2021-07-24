import {
  deepOrange as colorDeepOrange,
  teal as colorTeal,
} from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
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
