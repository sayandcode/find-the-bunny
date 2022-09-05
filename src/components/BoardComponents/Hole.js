import { Pets as PawIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { Box, Stack } from '@mui/material';
import { useContext } from 'react';
import { ConfigContext } from '../../utils/Contexts/gameConfig';

function Hole({ hasBunny, open, onClick: handleClick }) {
  const { noOfHoles } = useContext(ConfigContext);
  return (
    <Box
      sx={{
        height: `calc(50vw / ${noOfHoles})`,
        width: `calc(50vw / ${noOfHoles})`,
      }}
      onClick={handleClick}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          height: '100%',
          width: '100%',
          bgcolor: open ? 'transparent' : 'rgba(0,0,0,0.6)',
          border: open && '2px solid red',
          borderRadius: '4px',
        }}
      >
        {hasBunny && <PawIcon />}
      </Stack>
    </Box>
  );
}

Hole.propTypes = {
  hasBunny: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Hole;
