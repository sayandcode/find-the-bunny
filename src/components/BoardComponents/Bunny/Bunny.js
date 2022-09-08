import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ReactComponent as BunnySVG } from '../../../assets/JumpingBunny.svg';
import { ConfigContext } from '../../../utils/Contexts/gameConfig';
import BunnyHelper from './BunnyHelper';

function Bunny({ holeSize, selectedHole, bunnyPos, holePositions }) {
  /* CONTEXTS */
  const { godMode } = useContext(ConfigContext);

  // everything is handled inside bunnyHelper
  const helper = new BunnyHelper(
    holeSize,
    selectedHole,
    bunnyPos,
    holePositions,
    godMode
  );

  return (
    /* Easiest way to give styles to svg component. 
    Dont need any other libraries like emotion  */
    <Box
      sx={{
        '#bunny': {
          width: holeSize,
          height: holeSize,
          position: 'fixed',
          transformOrigin: 'top',
          opacity: helper.jumpOpacity,
          animation: `${helper.jumpingAnimation} 0.35s ease-in forwards`,
        },
      }}
    >
      <BunnySVG id="bunny" />
    </Box>
  );
}

Bunny.propTypes = {
  holeSize: PropTypes.string.isRequired,
  selectedHole: PropTypes.number,
  bunnyPos: PropTypes.exact({
    prev: PropTypes.number,
    curr: PropTypes.number,
  }).isRequired,
  holePositions: PropTypes.arrayOf(
    PropTypes.exact({ x: PropTypes.number, y: PropTypes.number })
  ).isRequired,
};

Bunny.defaultProps = {
  selectedHole: null,
};

export default Bunny;
