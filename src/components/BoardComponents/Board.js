import { Stack } from '@mui/material';
import { useEffect, useRef, useReducer, useState, useContext } from 'react';
import { ConfigContext } from '../../utils/Contexts/gameConfig';
import useMeasure from '../../utils/CustomHooks/useMeasure';
import useListeners, {
  publishEvent,
  subscribe,
  unsubscribe,
} from '../../utils/events';
import Bunny from './Bunny';
import Hole from './Hole';

const BOARD_SIZE = '50vw';

function Board() {
  /* CONTEXTS */
  const { noOfHoles } = useContext(ConfigContext);

  /* COMPONENT STATE */
  const [, forceRender] = useReducer((x) => x + 1, 0);
  const [bunnyPos, setBunnyPos] = useReducer(
    (prevState, newPos) => ({
      prev: prevState.curr,
      curr: newPos,
    }),
    { prev: null, curr: getRandomNumberUnder(noOfHoles) }
  );
  const [selectedHole, setSelectedHole] = useState(null);

  /* GET HOLE POSITIONS FOR BUNNY */
  const holeRefs = Array.from(Array(noOfHoles)).map(() => useRef());
  const holePositions = holeRefs.map((ref) => {
    return useMeasure(ref)?.middle;
  });

  /* RUNTIME CALCS */
  const holeSize = `calc(${BOARD_SIZE} / ${noOfHoles})`;

  /* EFFECTS */
  useListeners(startListening, stopListening);
  // force a rerender to calculate holePositions with ref obtained from first render
  useEffect(forceRender, []);

  /* FUNCTION DEFINITIONS */
  function startListening() {
    subscribe('reset', resetBoard);
  }
  function stopListening() {
    unsubscribe('reset', resetBoard);
  }

  function resetBoard(event) {
    const { newNoOfHoles } = event.detail;
    setSelectedHole(null);
    setBunnyPos(getRandomNumberUnder(newNoOfHoles));
  }

  function checkHole(holeNo) {
    const newBunnyPos = getNewPos();
    setSelectedHole(holeNo);
    setBunnyPos(newBunnyPos);
    if (newBunnyPos === holeNo) publishEvent('win');
  }

  function getNewPos() {
    const oldBunnyPos = bunnyPos.curr;
    const bunnyIsAtRightEnd = oldBunnyPos === noOfHoles - 1;
    const bunnyIsAtLeftEnd = oldBunnyPos === 0;
    if (bunnyIsAtLeftEnd) return oldBunnyPos + 1;
    if (bunnyIsAtRightEnd) return oldBunnyPos - 1;
    return Math.random() < 0.5 ? oldBunnyPos + 1 : oldBunnyPos - 1;
  }

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          width: BOARD_SIZE,
          margin: 'auto',
        }}
      >
        {holeRefs.map((ref, i) => (
          <Hole
            size={holeSize}
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            selected={selectedHole === i}
            onClick={() => checkHole(i)}
            ref={ref}
          />
        ))}
      </Stack>
      <Bunny
        holeSize={holeSize}
        bunnyPos={bunnyPos}
        selectedHole={selectedHole}
        holePositions={holePositions}
      />
    </>
  );
}

function getRandomNumberUnder(no) {
  return Math.floor(Math.random() * no);
}

export default Board;
