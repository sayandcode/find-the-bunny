import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';
import { useContext } from 'react';
import { ConfigContext } from '../../../utils/Contexts/gameConfig';
import { publishEvent } from '../../../utils/events';

const MIN_HOLES = 1;
const MAX_HOLES = 10;

function HolesSetting() {
  const { noOfHoles, setNoOfHoles } = useContext(ConfigContext);

  /* RUNTIME CALC */
  const isIncDisabled = noOfHoles === MAX_HOLES;
  const isDecDisabled = noOfHoles === MIN_HOLES;

  /* EVENT HANDLERS */
  function changeNoOfHoles({ increment }) {
    const delta = increment ? 1 : -1;
    const newNoOfHoles = noOfHoles + delta;
    setNoOfHoles(newNoOfHoles);
    publishEvent('reset', { newNoOfHoles });
  }
  return (
    <>
      <Typography variant="h6" component="h3">
        Number of Holes
      </Typography>
      <Stack
        direction="row"
        sx={{ justifySelf: 'center', alignItems: 'center' }}
      >
        <IconButton
          sx={{
            border: '2px solid',
            borderColor: !isDecDisabled && 'secondary.main',
          }}
          onClick={() => changeNoOfHoles({ increment: false })}
          disabled={isDecDisabled}
        >
          <RemoveIcon />
        </IconButton>
        <Typography mx={1}>{noOfHoles}</Typography>
        <IconButton
          sx={{
            border: '2px solid',
            borderColor: !isIncDisabled && 'secondary.main',
          }}
          onClick={() => changeNoOfHoles({ increment: true })}
          disabled={isIncDisabled}
        >
          <AddIcon />
        </IconButton>
      </Stack>
    </>
  );
}

export default HolesSetting;
