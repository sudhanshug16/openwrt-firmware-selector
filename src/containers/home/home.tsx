import { Box, CircularProgress, Container, Grid, Paper, Typography } from '@material-ui/core';
import React, { FC, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Overview } from './components/types';
import useFetchEntryData from './components/use-fetch-entry-data';
import VersionSelector from './components/VersionSelector';

const Home: FC = () => {
  const entryData = useFetchEntryData();
  const { t } = useTranslation();

  if (!entryData) return <p>Loading...</p>;
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
              <Grid item xs={12} md>
                <Suspense fallback={<CircularProgress />}>
                  {entryData.length && (
                    <VersionSelector
                      data-testid="version-selector"
                      versions={entryData[1] as string[]}
                      branchVersion={[entryData[0]] as Overview[]}
                    />
                  )}
                </Suspense>
              </Grid>
              <Grid item xs={12} md={3}></Grid>
            </Grid>
            {/* {selectedProfile && ( */}
            {/* <Box> */}
            {/* <ProfileDetails
                  selectedProfile={selectedProfile}
                  selectedVersion={selectedVersion}
                /> */}
            {/* </Box> */}
            {/* )} */}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;
