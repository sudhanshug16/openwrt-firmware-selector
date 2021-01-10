import React, { FunctionComponent } from 'react';
import { IconButton, makeStyles, Snackbar, SnackbarContent } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';

const SnackBarStyles = makeStyles((theme) => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: '20px',
    fontSize: 20,
  },
}));

type Props = {
  open: boolean;
  closeHandle: () => void;
  errorMessage: string;
};

const ErrorSnackbar: FunctionComponent<Props> = ({ open, closeHandle, errorMessage }) => {
  const classes = SnackBarStyles();
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={closeHandle}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
    >
      <SnackbarContent
        className={classes.error}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <ErrorIcon className={classes.icon} />
            {errorMessage || 'An unexpected error occurred. Please try again'}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="Close" color="inherit" onClick={closeHandle}>
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

export default ErrorSnackbar;
