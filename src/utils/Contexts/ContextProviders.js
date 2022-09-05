import PropTypes from 'prop-types';
import { CssBaseline, ThemeProvider } from '@mui/material';
import ConfigContextProvider from './gameConfig';
import customTheme from '../CustomTheme';

function ContextProviders({ children }) {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <ConfigContextProvider>{children}</ConfigContextProvider>
    </ThemeProvider>
  );
}

ContextProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProviders;
