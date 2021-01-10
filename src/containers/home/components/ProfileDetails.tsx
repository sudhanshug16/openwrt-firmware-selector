import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Launch, CloudDownload } from '@material-ui/icons';
import Axios from 'axios';
import { isEqual } from 'lodash';
import { useTranslation } from 'react-i18next';

import { ProfilesEntity } from '../../../types/overview';
import { Profile, TitlesEntity } from '../../../types/profile';
import config from '../../../config';

type Props = {
  selectedVersion: string;
  selectedProfile: ProfilesEntity;
};

const getTitle = (title: TitlesEntity) => {
  return title.title || `${title.vendor} ${title.model}`;
};

const profilesData: { [key: string]: Profile } = {};

const ProfileDetails: FunctionComponent<Props> = ({ selectedVersion, selectedProfile }) => {
  const [profile, setProfileData] = useState<Profile>();
  const [working, toggleWorking] = useState<boolean>(true);
  const { t } = useTranslation();

  const getHelpKey = (type: string) => {
    const lc = type.toLowerCase();
    if (lc.includes('sysupgrade')) {
      return 'sysupgrade-help';
    }
    if (lc.includes('factory') || lc === 'trx' || lc === 'chk') {
      return 'factory-help';
    }
    if (lc.includes('kernel') || lc.includes('zimage') || lc.includes('uimage')) {
      return 'kernel-help';
    }
    if (lc.includes('root')) {
      return 'rootfs-help';
    }
    if (lc.includes('sdcard')) {
      return 'sdcard-help';
    }
    if (lc.includes('tftp')) {
      return 'tftp-help';
    }
    return 'other-help';
  };

  const getProfileData = useCallback(async () => {
    let profileData = profilesData[selectedProfile.id];

    toggleWorking(true);

    if (!profileData) {
      const response = await Axios.get<Profile>(
        `${process.env.PUBLIC_URL}/data/${selectedVersion}/${selectedProfile.target}/${selectedProfile.id}.json`
      );
      profileData = response.data;
      profilesData[selectedProfile.id] = profileData;
    }

    toggleWorking(false);

    return profileData;
  }, [selectedVersion, selectedProfile]);

  useEffect(() => {
    if (selectedVersion && selectedProfile) {
      getProfileData().then((_profileData) => {
        if (!isEqual(profile, _profileData)) setProfileData(_profileData);
      });
    }
  }, [selectedVersion, selectedProfile, getProfileData, profile]);

  if (working || !profile) return <CircularProgress />;

  const buildAt = new Date(profile.build_at);

  return (
    <>
      <Box paddingTop={3} paddingBottom={2}>
        <Typography variant="h6" component="h1" align="left">
          {t('tr-version-build')}
        </Typography>
      </Box>

      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>{t('tr-model')}</TableCell>
              <TableCell>{profile.titles?.map((title) => getTitle(title)).join(', ')}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('tr-target')}</TableCell>
              <TableCell>{profile.target}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('tr-version')}</TableCell>
              <TableCell>
                {profile.version_number} ({profile.version_code})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('tr-date')}</TableCell>
              <TableCell>{buildAt.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Info</TableCell>
              {profile.titles && (
                <TableCell>
                  {profile.titles
                    .map<React.ReactNode>((title) => {
                      const titleString = getTitle(title);
                      const infoUrl = config.info_url
                        .replace('{title}', encodeURI(titleString))
                        .replace('{target}', profile.target)
                        .replace('{id}', profile.id)
                        .replace('{version}', profile.version_number);

                      return (
                        <Link href={infoUrl}>
                          {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
                          {profile.titles!.length > 1 && (
                            <Typography component="span">{titleString}</Typography>
                          )}
                          <Launch
                            style={{
                              marginLeft: 10,
                              verticalAlign: 'middle',
                            }}
                          />
                        </Link>
                      );
                    })
                    .reduce((prev, curr) => [
                      prev,
                      <Box display="inline-block" marginRight={2} />,
                      curr,
                    ])}
                </TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box paddingTop={3} paddingBottom={2}>
        <Typography variant="h6" component="h1" align="left">
          {t('tr-downloads')}
        </Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Download link</TableCell>
              <TableCell>Help Text</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profile.images?.map((i) => {
              const downloadURL = `${config.image_url
                .replace('{target}', profile.target)
                .replace('{version}', profile.version_number)}/${i.name}`;
              return (
                <TableRow>
                  <TableCell>
                    <Link href={downloadURL} target="_blank">
                      <Button endIcon={<CloudDownload />} variant="contained" color="primary">
                        {i.type}
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Box p={1}>
                      <Typography>{t(`tr-${getHelpKey(i.type)}`)}</Typography>
                      <Typography variant="caption">sha256sum: {i.sha256}</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProfileDetails;
