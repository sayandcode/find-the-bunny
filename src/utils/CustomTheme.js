import { createTheme } from '@mui/material';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#4e6e5d',
      light: '#f4fdd9',
      contrastText: 'white',
    },
    secondary: {
      main: '#f0a868',
      light: '#ffe8c2',
      contrastText: 'white',
    },
  },
});

export default customTheme;
