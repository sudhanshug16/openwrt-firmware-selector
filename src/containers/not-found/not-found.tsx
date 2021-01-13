import React, { FunctionComponent } from 'react';
import { Box, Container, Link, Paper, Typography } from '@material-ui/core';

const NotFound: FunctionComponent = () => (
  <Container style={{ marginTop: '50px' }}>
    <Paper elevation={3}>
      <Box padding={3}>
        <Typography variant="h5" component="h3">
          404 Page Not Found
        </Typography>
        <Typography component="p">
          Please head to the <Link href={process.env.PUBLIC_URL}>home</Link>.
        </Typography>
      </Box>
    </Paper>
  </Container>
);

export default NotFound;
