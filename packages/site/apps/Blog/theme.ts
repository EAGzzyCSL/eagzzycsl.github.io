import colorDeepOrange from '@material-ui/core/colors/deepOrange'
import colorTeal from '@material-ui/core/colors/teal'
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
