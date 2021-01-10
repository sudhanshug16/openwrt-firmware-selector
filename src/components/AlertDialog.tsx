import React, { FunctionComponent } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

type Props = {
  open: boolean;
  cancelHandler: () => void;
  acceptHandler: () => void;
  body: React.ReactElement;
  title: React.ReactElement;
  cancelComponent: React.ReactElement;
  acceptComponent: React.ReactElement;
};

const AlertDialog: FunctionComponent<Props> = ({
  open,
  cancelHandler,
  acceptHandler,
  body,
  title,
  cancelComponent,
  acceptComponent,
}) => {
  return (
    <Dialog
      open={open}
      onClose={cancelHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{body}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {acceptHandler && (
          <Button onClick={acceptHandler} color="primary">
            {acceptComponent}
          </Button>
        )}
        {cancelHandler && (
          <Button onClick={cancelHandler} color="secondary" variant="contained" autoFocus>
            {cancelComponent}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
