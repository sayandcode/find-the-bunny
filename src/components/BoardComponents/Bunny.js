import { keyframes } from '@emotion/react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { ReactComponent as BunnySVG } from '../../assets/JumpingBunny.svg';

const JUMP_ANGLE = 30; // deg
const JUMP_HEIGHT = '25vw';

function Bunny({ holeSize, selectedHole, bunnyPos, holePositions }) {
  const oldHolePos = holePositions[bunnyPos.prev] || { x: null, y: null };
  const currHolePos = holePositions[bunnyPos.curr] || { x: null, y: null };

  const jumpDirection = currHolePos.x > oldHolePos.x ? 'right' : 'left';
  const rotateAngle = jumpDirection === 'right' ? JUMP_ANGLE : -JUMP_ANGLE;
  const isJumpingIntoSelectedHole = selectedHole === bunnyPos.curr;

  let endingTop = `${currHolePos.y}px`;
  let endingRotation = '0deg';
  let endingTransformOrigin = 'top';

  if (isJumpingIntoSelectedHole) {
    endingTop = `calc(${endingTop} - ${holeSize})`;
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
    }
    5%{
      transform: translateX(-50%) rotate(${rotateAngle}deg);
    }
    50%{
      top: calc(${oldHolePos.y}px - ${JUMP_HEIGHT});
    }
    95%{
      transform: translateX(-50%) rotate(${-rotateAngle}deg);
    }
    to{
      top: ${endingTop};
      left: ${currHolePos.x}px;
      transform-origin: ${endingTransformOrigin};
      transform: translateX(-50%) rotate(${endingRotation});
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
