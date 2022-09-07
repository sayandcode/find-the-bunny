import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

function GodStyledText({ children, size }) {
  return (
    <Typography
      sx={{ color: 'primary.dark' }}
      fontSize={size}
      variant="overline"
    >
      {children}
    </Typography>
  );
}

GodStyledText.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.string.isRequired,
};

export default GodStyledText;
