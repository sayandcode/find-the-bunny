import { Stack } from '@mui/material';
import { useState, useContext } from 'react';
import { ConfigContext } from '../../utils/Contexts/gameConfig';
import useListeners, {
  publishEvent,
  subscribe,
  unsubscribe,
} from '../../utils/events';
import Hole from './Hole';

function Board() {
  const { noOfHoles } = useContext(ConfigContext);
  const [bunnyPos, setBunnyPos] = useState(getRandomNumberUnder(noOfHoles));
  const [openHole, setOpenHole] = useState(null);

  useListeners(startListening, stopListening);

  /* FUNCTION DEFINITIONS */
  function startListening() {
    subscribe('reset', resetBoard);
  }
  function stopListening() {
    unsubscribe('reset', resetBoard);
  }

  function resetBoard() {
    setOpenHole(null);
    setBunnyPos(getRandomNumberUnder(noOfHoles));
  }

  function checkHole(holeNo) {
    const newBunnyPos = getNewPos(bunnyPos);
    setOpenHole(holeNo);
    setBunnyPos(newBunnyPos);
    if (newBunnyPos === holeNo) publishEvent('win');

    function getNewPos(oldBunnyPos) {
      const bunnyIsAtRightEnd = oldBunnyPos === noOfHoles - 1;
      const bunnyIsAtLeftEnd = oldBunnyPos === 0;
      if (bunnyIsAtLeftEnd) return oldBunnyPos + 1;
      if (bunnyIsAtRightEnd) return oldBunnyPos - 1;
      return Math.random() < 0.5 ? oldBunnyPos + 1 : oldBunnyPos - 1;
    }
  }

  return (
    <Stack direction="row" spacing={2}>
      {Array.from(Array(noOfHoles)).map((_, i) => (
        <Hole
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          hasBunny={bunnyPos === i}
          open={openHole === i}
          onClick={() => checkHole(i)}
        />
      ))}
    </Stack>
  );
}

function getRandomNumberUnder(no) {
  return Math.floor(Math.random() * no);
}

export default Board;
