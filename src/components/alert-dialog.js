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

function AlertDialog({open, cancelHandler, acceptHandler, body, title, cancelComponent, acceptComponent}) {
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
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {
          acceptHandler && (
            <Button onClick={acceptHandler} color="primary">
              {acceptComponent}
            </Button>
          )
        }
        {
          cancelHandler && (
            <Button onClick={cancelHandler} color="secondary" variant="contained" autoFocus>
              {cancelComponent}
            </Button>
          )
        }
      </DialogActions>
    </Dialog>
  );
}

AlertDialog.propTypes = {
  open: PropTypes.bool,
  cancelHandler: PropTypes.func,
  acceptHandler: PropTypes.func,
  body: PropTypes.object,
  title: PropTypes.string,
  cancelComponent: PropTypes.elementType,
  acceptComponent: PropTypes.object,
};

export default AlertDialog;
