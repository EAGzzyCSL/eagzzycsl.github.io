import { blue as colorBlue, amber as colorBrown } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export default createTheme({
  palette: {
    primary: {
      main: colorBlue[500],
    },
    secondary: {
      main: colorBrown[600],
    },
  },
})
