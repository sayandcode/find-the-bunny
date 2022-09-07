import { keyframes } from '@emotion/react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ReactComponent as BunnySVG } from '../../assets/JumpingBunny.svg';
import { ConfigContext } from '../../utils/Contexts/gameConfig';

const JUMP_ANGLE = 30; // deg
const JUMP_HEIGHT = '25vw';
const PATH_SHOWING = {
  nothing:
    'polygon(0 0, 0 0, 100% 0, 100% 0, 100% 0, 100% 0, 100% 0, 100% 0, 100% 0, 0 0, 0 0, 0 0)',
  little:
    'polygon(18% 10%, 30% 0, 64% 0, 85% 0%, 100% 0, 100% 15%, 100% 27%, 91% 38%, 72% 44%, 46% 39%, 33% 31%, 21% 24%)', // frame [1]
  everything:
    'polygon(0 0, 0 0, 100% 0, 100% 0, 100% 0, 100% 0, 100% 0, 100% 0, 100% 100%, 79% 100%, 1% 100%, 0 100%)',
};

function Bunny({ holeSize, selectedHole, bunnyPos, holePositions }) {
  /* CONTEXTS */
  const { godMode } = useContext(ConfigContext);

  const oldHolePos = holePositions[bunnyPos.prev] || { x: null, y: null };
  const currHolePos = holePositions[bunnyPos.curr] || { x: null, y: null };

  const jumpDirection = currHolePos.x > oldHolePos.x ? 'right' : 'left';
  const rotateAngle = jumpDirection === 'right' ? JUMP_ANGLE : -JUMP_ANGLE;
  const isJumpingIntoSelectedHole = selectedHole === bunnyPos.curr;

  let endingTop = `${currHolePos.y}px`;
  let endingRotation = '0deg';
  let endingTransformOrigin = 'top';
  let jumpOpacity = godMode ? '1' : '0';
  const clipPaths = {
    '0%': PATH_SHOWING.nothing,
    '15%': PATH_SHOWING.little,
    '30%': PATH_SHOWING.everything,
    '85%': PATH_SHOWING.everything,
    '95%': PATH_SHOWING.little,
    '100%': PATH_SHOWING.nothing,
  };

  if (isJumpingIntoSelectedHole) {
    endingTop = `calc(${endingTop} - ${holeSize})`;
    jumpOpacity = '1';
    clipPaths['95%'] = PATH_SHOWING.everything;
    clipPaths['100%'] = PATH_SHOWING.everything;

    if (jumpDirection === 'right') {
      endingRotation = '-90deg';
      endingTransformOrigin = '60% 70%';
    } else if (jumpDirection === 'left') {
      endingRotation = '90deg';
      endingTransformOrigin = '40% 60%';
    }
  }

  const jumpingAnimation = keyframes`
    from{
      top: ${oldHolePos.y}px;
      left: ${oldHolePos.x}px;
      transform: translateX(-50%) rotateX(0deg);
      clip-path: ${clipPaths['0%']};
    }
    5%{
      transform: translateX(-50%) rotate(${rotateAngle}deg);
    }
    15%{
      clip-path: ${clipPaths['15%']};
    }
    30%{
      clip-path: ${clipPaths['30%']};
    }
    50%{
      top: calc(${oldHolePos.y}px - ${JUMP_HEIGHT});
    }
    85%{
      clip-path: ${clipPaths['85%']};
    }
    95%{
      transform: translateX(-50%) rotate(${-rotateAngle}deg);
      clip-path: ${clipPaths['95%']};
    }
    to{
      top: ${endingTop};
      left: ${currHolePos.x}px;
      transform-origin: ${endingTransformOrigin};
      transform: translateX(-50%) rotate(${endingRotation});
      clip-path: ${clipPaths['100%']};
    }
  `;

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
          opacity: jumpOpacity,
          animation: `${jumpingAnimation} 0.35s ease-in forwards`,
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
