import React, { FunctionComponent, useState } from 'react';
import { Container, Paper, Box, Typography, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import SearchField from './components/SearchField';
import VersionSelector from './components/VersionSelector';
import ProfileDetails from './components/ProfileDetails';
import config from '../../config';
import { ProfilesEntity } from '../../types/overview';

const Home: FunctionComponent = () => {
  const [selectedVersion, setSelectedVersion] = useState(Object.keys(config.versions)[0]);
  const [selectedProfile, setSelectedProfile] = useState<ProfilesEntity | null>();
  const { t } = useTranslation();

  const onVersionChange = (version: string) => {
    setSelectedVersion(version);
  };

  const onProfileChange = (profile: ProfilesEntity) => {
    setSelectedProfile(profile);
  };

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
              <Grid item xs>
                <SearchField selectedVersion={selectedVersion} onProfileChange={onProfileChange} />
              </Grid>
              <Grid item xs={3}>
                <VersionSelector
                  selectedVersion={selectedVersion}
                  onVersionChange={onVersionChange}
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
