import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { forwardRef } from 'react';
import { ReactComponent as HoleSVG } from '../../assets/BunnyHole.svg';

const Hole = forwardRef(({ size, selected, onClick: handleClick }, ref) => {
  return (
    <Box
      className={selected && 'covered'}
      sx={{
        // hole styles
        '.hole': {
          height: size,
          width: size,
          '.lid': {
            opacity: 0,
          },
          '&:hover .hole-rim': {
            fill: (theme) => theme.palette.secondary.main,
          },
        },
        '&.covered .lid': {
          opacity: 1,
        },
      }}
      onClick={handleClick}
      ref={ref}
    >
      <HoleSVG className="hole" />
    </Box>
  );
});

Hole.propTypes = {
  size: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Hole;
