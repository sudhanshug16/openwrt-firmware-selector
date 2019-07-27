import {
  IconButton,
  makeStyles,
  Snackbar,
  SnackbarContent,
} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import PropTypes from 'prop-types';

const SnackBarStyles = makeStyles(theme => ({
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

function ErrorSnackBar({open, closeHandle, errorMessage}) {
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
            <ErrorIcon className={classes.icon}/>
            {errorMessage ||
                'An unexpected error occurred. Please try again'}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="Close" color="inherit"
            onClick={closeHandle}>
            <CloseIcon/>
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}

ErrorSnackBar.propTypes = {
  open: PropTypes.bool,
  closeHandle: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default ErrorSnackBar;
