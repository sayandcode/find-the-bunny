import { Backdrop, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useListeners, { publishEvent } from '../utils/events';

function WinScreen() {
  const [show, setShow] = useState(false);

  useListeners(startListening, stopListening);

  /* EVENT HANDLERS */
  const resetGame = () => {
    publishEvent('reset');
  };

  /* FUNCTION DEFINITIONS */
  function startListening() {
    document.addEventListener('win', showWinScreen);
    document.addEventListener('reset', hideWinScreen);
  }

  function stopListening() {
    document.removeEventListener('win', showWinScreen);
    document.removeEventListener('reset', hideWinScreen);
  }

  const showWinScreen = () => setShow(true);
  const hideWinScreen = () => setShow(false);

  return (
    show && (
      <Backdrop open sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="h3" color="white">
          You won!
        </Typography>
        <Button variant="contained" size="large" onClick={resetGame}>
          Play again
        </Button>
      </Backdrop>
    )
  );
}

export default WinScreen;
