import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

function AlertDialog({open, cancelHandler, acceptHandler, text, title, cancelComponent, acceptComponent}) {
  return (
    <Dialog
      open={open}
      onClose={cancelHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={acceptHandler} color="primary">
          {acceptComponent}
        </Button>
        <Button onClick={cancelHandler} color="secondary"
          variant="contained" autoFocus>
          {cancelComponent}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AlertDialog.propTypes = {
  open: PropTypes.bool,
  cancelHandler: PropTypes.func,
  acceptHandler: PropTypes.func,
  text: PropTypes.string,
  title: PropTypes.string,
  cancelComponent: PropTypes.elementType,
  acceptComponent: PropTypes.object,
};

export default AlertDialog;
