import { Dialog, IconButton, styled } from "@mui/material";

export const ConfirmDialog = styled(Dialog)(() => ({
  '& .MuiPaper-root': {
    padding: '1rem',
    maxWidth: '35rem',

    '& .Mui-DialogContent-root': {
      padding: '.5rem 1.5rem'
    },

    '& .MuiDialogActions-root': {
      paddingBottom: '0',
      paddingTop: '0',
    }
  }
}));

export const CloseButton = styled(IconButton)(({theme}) => ({
  position: 'absolute',
  top: '1rem', 
  right: '1rem', 
  color: theme.palette.text.primary,
}));
