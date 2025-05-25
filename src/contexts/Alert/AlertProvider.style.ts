import { Stack, styled } from '@mui/material';

const AlertContainer = styled(Stack)(() => ({
  position: 'absolute',
  top: '7em',
  right: '1em',
  zIndex: '99999'
}));

export default AlertContainer;
