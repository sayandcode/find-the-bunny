import { Backdrop, Button, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { ConfigContext } from '../utils/Contexts/gameConfig';
import useListeners, {
  publishEvent,
  subscribe,
  unsubscribe,
} from '../utils/events';

function WinScreen() {
  const [show, setShow] = useState(false);
  const { noOfHoles } = useContext(ConfigContext);

  useListeners(startListening, stopListening);

  /* EVENT HANDLERS */
  const resetGame = () => {
    publishEvent('reset', { newNoOfHoles: noOfHoles });
  };

  /* FUNCTION DEFINITIONS */
  function startListening() {
    subscribe('win', showWinScreen);
    subscribe('reset', hideWinScreen);
  }

  function stopListening() {
    unsubscribe('win', showWinScreen);
    unsubscribe('reset', hideWinScreen);
  }

  const showWinScreen = () => setShow(true);
  const hideWinScreen = () => setShow(false);

  return (
    show && (
      <Backdrop open sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography
          variant="h3"
          fontFamily="Pacifico, cursive"
          fontSize="4rem"
          gutterBottom
          color="secondary"
        >
          You won!
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={resetGame}
          color="secondary"
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightBold,
            borderRadius: (theme) => theme.shape.borderRadius,
          }}
        >
          Play again
        </Button>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio src="music/WinCheer.mp3" autoPlay />
      </Backdrop>
    )
  );
}

export default WinScreen;
