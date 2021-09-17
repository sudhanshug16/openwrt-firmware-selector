import { Box, CircularProgress, Container, Grid, Paper, Typography } from '@material-ui/core';
import React, { FunctionComponent, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Overview } from './components/types';
import useFetchEntryData from './components/use-fetch-entry-data';
import VersionSelector from './components/VersionSelector';

const Home: FunctionComponent = () => {
  const entryData = useFetchEntryData();
  const { t } = useTranslation();

  if (!entryData) return <p>Loading...</p>;
  const versions = entryData[1];

  return (
    <Container>
      <Box paddingY={4}>
        <Paper>
          <Box padding={3}>
            <Box paddingBottom={2}>
              <Typography variant="h4" component="h1" align="left">
                {t('tr-load')}
              </Typography>
            </Box>
            <Box paddingBottom={2}>
              <Typography variant="h6" component="h2" align="left">
                {t('tr-message')}
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Suspense fallback={<CircularProgress />}>
                {versions && (
                  <VersionSelector
                    data-testid="version-selector"
                    versions={versions as string[]}
                    branchVersion={[entryData[0]] as Overview[]}
                  />
                )}
              </Suspense>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;
