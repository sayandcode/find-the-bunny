import { Box } from '@mui/material';
import PropTypes from 'prop-types';

function GodStyledSwitch({ size, on, onClick: handleClick }) {
  return (
    <Box
      sx={{
        height: size,
        aspectRatio: '2 / 1',
        bgcolor: on ? 'secondary.main' : 'primary.dark',
        borderRadius: '10vh',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transitionDelay: (theme) => `${theme.transitions.duration.short / 2}ms`,
      }}
      onClick={handleClick}
    >
      <Box
        sx={{
          height: '80%',
          width: '40%',
          borderRadius: '50%',
          bgcolor: 'secondary.contrastText',
          position: 'absolute',
          left: on ? '54%' : '5%',
          transition: (theme) =>
            `left ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
        }}
      />
    </Box>
  );
}

GodStyledSwitch.propTypes = {
  size: PropTypes.string.isRequired,
  on: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

GodStyledSwitch.defaultProps = {
  onClick: () => {},
};
export default GodStyledSwitch;
