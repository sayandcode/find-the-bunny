import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import '@fontsource/pacifico';
import GameSettings from './GameSettings/GameSettings';
import GodModeToggle from './GodModeToggle/GodModeToggle';

function Background({ children }) {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        bgcolor: 'primary.light',
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        fontFamily="Pacifico, cursive"
        fontSize="6vw"
        color="primary.main"
        textAlign="center"
        pt="10vh"
        mb="30vh"
      >
        find the bunny
      </Typography>
      <GameSettings />
      <GodModeToggle />
      {children}
    </Box>
  );
}

Background.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Background;
