import React, { Suspense, FunctionComponent, useState } from 'react';
import { Container, Paper, Box, Typography, Grid, CircularProgress } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ProfileSearch from './components/ProfileSearch';
import VersionSelector from './components/VersionSelector';
import ProfileDetails from './components/ProfileDetails';
import config from '../../config';
import { ProfilesEntity } from '../../types/overview';
import useFetchEntryData from './components/use-fetch-entry-data';

const Home: FunctionComponent = () => {
  const [selectedVersion, setSelectedVersion] = useState(Object.keys(config.versions)[0]);
  const [selectedProfile, setSelectedProfile] = useState<ProfilesEntity | null>();
  const { t } = useTranslation();
  const entryData = useFetchEntryData(selectedVersion);

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
                  {entryData && entryData[1] && (
                    <ProfileSearch
                      branchVersion={entryData[1] as string}
                      selectedVersion={selectedVersion}
                      onProfileChange={setSelectedProfile}
                      data-testid="profile-search"
                    />
                  )}
                </Suspense>
              </Grid>
              <Grid item xs={12} md={3}>
                <VersionSelector
                  data-testid="version-selector"
                  selectedVersion={selectedVersion}
                  onVersionChange={setSelectedVersion}
                />
              </Grid>
            </Grid>
            {selectedProfile && (
              <Box>
                <ProfileDetails
                  selectedProfile={selectedProfile}
                  selectedVersion={selectedVersion}
                />
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;
