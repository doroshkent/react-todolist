import { ThemeOptions } from '@mui/material/styles'
import { createTheme } from '@mui/material'

export const theme: ThemeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7c8de6',
    },
    secondary: {
      main: '#ffffff',
    },
    divider: 'rgba(0,0,0,0.12)',
  },
})
