import { alpha, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { red } from '@mui/material/colors';

let theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#000',
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontSize: '3rem',
      fontWeight: 900,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 500,
      lineHeight: 1.3,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 'none',

          '& svg': {
            marginRight: '.5rem',
          }
        },
        contained: {
          background: '#1976d2',
          
          ":hover": {
            background: '#104f8d',
          }
        },
        outlined: {
          ":hover": {
            background: alpha('#104f8d', .1),
          }
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: 12,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          svg: {
            width: '1rem',
            height: '1rem',
          }
        },
        head: {
          fontWeight: 'bold',
        },
      }
    }
  },
});

theme = responsiveFontSizes(theme);

export default theme;
