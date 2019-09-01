import React from 'react';
import { Container, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const page404Styles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

export default function NotFound() {
  var classes = page404Styles();
  return (
    <Container style={{ marginTop: '50px' }}>
      <Paper className={classes.root} elevation={3}>
        <Typography variant="h5" component="h3">
          404 Page Not Found
        </Typography>
        <Typography component="p">Please head to the home.</Typography>
      </Paper>
    </Container>
  );
}
