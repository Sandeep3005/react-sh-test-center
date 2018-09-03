import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { 
      main: "#2C5197",
    }, 
    secondary: { 
      main: '#AAABB8' 
    }
  },
  typography: {
    "fontFamily": "Nunito",
  }

});

export default theme;