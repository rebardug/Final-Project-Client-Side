import { createTheme } from '@material-ui/core'

const theme = createTheme({
    palette: {
      primary: {
        main: '#E8EEF1'
      },
      secondary: {
        main: '#43B0F1'
      },
      white: '#1E3D58'
  },
  typography: {
    fontFamily: 'Ubuntu',
    fontWeightLight:300,
    fontWeightRegular:400,
    fontWeightMedium:500,
    fontWeightBold:700,

  }
})

export default theme