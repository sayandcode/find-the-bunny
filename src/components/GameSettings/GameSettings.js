import { Settings as GearIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import SettingsModal from './Subcomponents/SettingsModal';

function GameSettings() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        size="large"
        sx={{
          position: 'absolute',
          top: '3vh',
          right: '3vw',
        }}
      >
        <GearIcon
          sx={{
            fontSize: '2rem',
          }}
        />
      </IconButton>
      <SettingsModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default GameSettings;
