import { Close as CloseIcon } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import HolesSetting from './HolesSetting';

function SettingsModal({ open, onClose: handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={false}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
        Settings
        <IconButton onClick={handleClose} sx={{ ml: 'auto' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          width: '50vw',
          display: 'grid',
          gridTemplateColumns: '1fr 30%',
          alignItems: 'center',
          ml: 1,
        }}
      >
        <HolesSetting />
      </DialogContent>
    </Dialog>
  );
}

SettingsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SettingsModal;
