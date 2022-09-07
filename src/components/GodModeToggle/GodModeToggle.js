import { Stack } from '@mui/material';
import { useContext } from 'react';
import { ConfigContext } from '../../utils/Contexts/gameConfig';
import GodStyledSwitch from './Subcomponents/GodStyledSwitch';
import GodStyledText from './Subcomponents/GodStyledText';

const TOGGLE_SIZE = '4.5vh';

function GodModeToggle() {
  const { godMode, setGodMode } = useContext(ConfigContext);
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{
        position: 'fixed',
        bottom: '1vh',
        left: '3vw',
        cursor: 'pointer',
      }}
      onClick={() => setGodMode((old) => !old)}
    >
      <GodStyledText size={TOGGLE_SIZE}>DEV</GodStyledText>
      <GodStyledSwitch size={TOGGLE_SIZE} on={godMode} />
      <GodStyledText size={TOGGLE_SIZE}>GOD</GodStyledText>
    </Stack>
  );
}

export default GodModeToggle;
