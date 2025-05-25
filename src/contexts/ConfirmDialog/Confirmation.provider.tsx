import React, { useState, ReactNode } from 'react';
import { DialogTitle, DialogActions, Button, DialogContent } from '@mui/material';
import { ConfirmationContext, ConfirmationContextType } from './Confirmation.context';
import { CloseButton, ConfirmDialog } from './Confirmation.style';
import { X } from 'lucide-react';

export type ConfirmationDialogProps = {
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

// Provider component to wrap the application
export const ConfirmationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [confirmation, setConfirmation] = useState<ConfirmationDialogProps | null>(null);

  const requestConfirmation: ConfirmationContextType = ({ message, onConfirm, onCancel }) => {
    setConfirmation({
      message,
      onConfirm,
      onCancel,
    });
  };

  const handleConfirm = () => {
    confirmation?.onConfirm?.();
    setConfirmation(null);
  };

  const handleCancel = () => {
    confirmation?.onCancel?.();
    setConfirmation(null);
  };

  return (
    <ConfirmationContext.Provider value={requestConfirmation}>
      {children}
      <ConfirmDialog open={!!confirmation} onClose={handleCancel} data-testid="confirm-modal">
        <DialogTitle>Deleting user</DialogTitle>
        <CloseButton onClick={handleCancel}>
          <X width="1rem" height="1rem"/>
        </CloseButton>
        <DialogContent>{confirmation?.message}</DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary" variant="outlined" data-testid="cancel-button">
            No
          </Button>
          <Button onClick={handleConfirm} color="error" autoFocus variant="contained" data-testid="confirm-button">
            Yes
          </Button>
        </DialogActions>
      </ConfirmDialog>
    </ConfirmationContext.Provider>
  );
};