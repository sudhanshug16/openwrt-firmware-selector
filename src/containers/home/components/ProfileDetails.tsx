import React, { FunctionComponent, ReactNode, useCallback, useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Launch, CloudDownload, Add, ExpandMore } from '@material-ui/icons';
import axios from 'axios';
import { isEqual } from 'lodash';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';

import { ProfilesEntity } from '../../../types/overview';
import { Profile, TitlesEntity } from '../../../types/profile';
import config from '../../../config';
import { getTitle } from '../utils/title';
import asu from '../../../utils/asu';
import { GetBuildResponse } from '../../../types/asu';
import { getAsuDownloadLink, getStockDownloadLink } from '../utils/links';

const useStyles = makeStyles(() => ({
  chip: {
    '&:focus': {
      border: `2px solid #000`,
    },
  },
}));

type Props = {
  selectedVersion: string;
  selectedProfile: ProfilesEntity;
};

const profilesData: { [key: string]: Profile } = {};

const ProfileDetails: FunctionComponent<Props> = ({ selectedVersion, selectedProfile }) => {
  const classes = useStyles();
  const [profile, setProfile] = useState<Profile>();
  const [showAddPackages, setShowAddPackages] = useState(false);
  const [customPackages, setCustomPackages] = useState<Set<string>>(new Set());
  const [customPackagesInputValue, setCustomPackagesInputValue] = useState<string>('');
  const [showPackageExistsError, setShowPackageExistsError] = useState(false);
  const [buildStatus, setBuildStatus] = useState<React.ReactNode>();
  const [buildResponse, setBuildResponse] = useState<GetBuildResponse>();
  const [buildError, setBuildError] = useState<string>();
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

  const preExistingPackages = (_profile = profile) =>
    Array.from(
      new Set([...(_profile?.default_packages || []), ...(_profile?.device_packages || [])])
    );

  const getProfileData = useCallback(async () => {
    let profileData = profilesData[selectedProfile.id];

    if (!profileData) {
      const response = await axios.get<Profile>(
        `${process.env.PUBLIC_URL}/data/${selectedVersion}` +
          `/${selectedProfile.target}/${selectedProfile.id}.json?t=${new Date().getTime()}`
      );
      profileData = response.data;
      profilesData[selectedProfile.id] = profileData;
    }

    return profileData;
  }, [selectedVersion, selectedProfile]);

  useEffect(() => {
    let mounted = true;
    getProfileData().then((_profileData) => {
      if (mounted && !isEqual(profile, _profileData)) {
        setProfile(_profileData);
        setCustomPackages(new Set(preExistingPackages(_profileData)));
      }
    });

    return () => {
      mounted = false;
    };
  }, [selectedVersion, selectedProfile, getProfileData, profile]);

  const toggleAddPackages = () => {
    if (!profile) return;
    setShowAddPackages(!showAddPackages);
    setCustomPackages(new Set(preExistingPackages()));
  };

  const appendAddPackageInput = (
    e?: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (((e && e.key === 'Enter') || !e) && customPackagesInputValue) {
      setCustomPackages((prev) => {
        setShowPackageExistsError(false);
        if (
          !profile?.device_packages?.includes(customPackagesInputValue) &&
          !profile?.default_packages?.includes(customPackagesInputValue)
        ) {
          return new Set(prev.add(customPackagesInputValue));
        }
        setShowPackageExistsError(true);
        return prev;
      });
      setCustomPackagesInputValue('');
    }
  };

  const onBuildStatusChange = (status: string) => {
    setBuildStatus(status);
  };

  if (!profile) return <CircularProgress />;

  const buildCustomImage = async () => {
    setBuildStatus('Please wait...');
    setBuildError(undefined);
    try {
      const response = await asu.build(
        Array.from(customPackages.values()),
        profile.target,
        profile.id,
        profile.version_number,
        onBuildStatusChange
      );
      setBuildResponse(response);
    } catch (e) {
      console.log(e);
      setBuildError(e.response.data.message);
    }
    setBuildStatus(undefined);
  };

  const buildAt = DateTime.fromFormat(profile.build_at, 'yyyy-MM-dd TT').toLocaleString(
    DateTime.DATETIME_MED
  );
  const hasAbilityToBuildCustomPackages = Object.keys(config).includes('asu_url');
  const canBuild = !isEqual(Array.from(customPackages.values()), preExistingPackages());
  const isBuilding = typeof buildStatus === 'string';

  return (
    <>
      <Box paddingTop={3} paddingBottom={2}>
        <Typography variant="h5" component="h3" align="left">
          {t('tr-version-build')}
        </Typography>
      </Box>

      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>{t('tr-model')}</TableCell>
              <TableCell id="title">
                {profile.titles?.map((title) => getTitle(title)).join(', ')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('tr-target')}</TableCell>
              <TableCell id="target">{profile.target}</TableCell>
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
              <TableCell>
                {profile.titles
                  ?.map<React.ReactNode>((title: TitlesEntity) => {
                    const titleString = getTitle(title);
                    const infoUrl = config.info_url.replace('{title}', encodeURI(titleString));
                    return (
                      <Link href={infoUrl} key={titleString}>
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
                  .reduce((acc: ReactNode, curr: ReactNode, i: number) => [
                    acc,
                    // eslint-disable-next-line react/no-array-index-key
                    <Box display="inline-block" marginRight={2} key={i} />,
                    curr,
                  ])}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box paddingTop={3} paddingBottom={2}>
        <Typography variant="h5" component="h3" align="left">
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
              const downloadURL = getStockDownloadLink(
                profile.version_number,
                profile.target,
                i.name
              );
              return (
                <TableRow key={downloadURL + i.type}>
                  <TableCell>
                    <Link href={downloadURL} target="_blank" data-testid="download_link">
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
      <Box paddingTop={3} paddingBottom={2}>
        <Typography variant="h5" component="h3" align="left">
          {t('Packages')}
        </Typography>
      </Box>
      {profile.default_packages && profile.default_packages.length > 0 && (
        <Box mb={2}>
          <Typography variant="h6" align="left">
            {t('Default Packages')}
          </Typography>
          {profile.default_packages?.join(', ')}
        </Box>
      )}
      {profile.device_packages && profile.device_packages.length > 0 && (
        <Box mb={2}>
          <Typography variant="h6" align="left">
            {t('Device Packages')}
          </Typography>
          {profile.device_packages.join(', ')}
        </Box>
      )}
      {hasAbilityToBuildCustomPackages && (
        <Box>
          {!showAddPackages && (
            <Button variant="outlined" size="small" onClick={toggleAddPackages}>
              customize packages
            </Button>
          )}
          {showAddPackages && (
            <>
              <Typography variant="h6" align="left">
                {t('Customize Packages')}
                <Box display="inline-block" ml={2}>
                  <Link href="https://openwrt.org/packages/table/start" target="_blank">
                    <Typography variant="caption">find packages index on this page</Typography>
                  </Link>
                </Box>
              </Typography>
              <br />
              {Array.from(customPackages.values()).map((p) => {
                return (
                  <Box key={p} pr={1} pb={1} display="inline-block">
                    <Chip
                      size="small"
                      label={p}
                      color={isBuilding ? 'default' : 'primary'}
                      className={classes.chip}
                      onDelete={() => {
                        if (!isBuilding)
                          setCustomPackages((prev) => {
                            const newSet = new Set(Array.from(prev.values()));
                            newSet.delete(p);
                            return newSet;
                          });
                      }}
                    />
                  </Box>
                );
              })}
              <br />
              <FormControl size="small">
                <InputLabel style={{ fontSize: '0.9em' }}>Custom Package Name</InputLabel>
                <Input
                  value={customPackagesInputValue}
                  disabled={isBuilding}
                  onChange={(e) => e && setCustomPackagesInputValue(e.currentTarget.value)}
                  onKeyUp={appendAddPackageInput}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => appendAddPackageInput()}>
                        <Add />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {showPackageExistsError && (
                <Box pt={2}>
                  <Typography color="error" variant="caption" component="div">
                    This profile already includes this package. Please try a diffrent one
                  </Typography>
                </Box>
              )}
              <Box mt={3}>
                {!buildStatus && (
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!canBuild}
                    onClick={buildCustomImage}
                  >
                    build customized image
                  </Button>
                )}
                {buildStatus && (
                  <>
                    <Grid
                      container
                      alignContent="center"
                      direction="row"
                      alignItems="center"
                      spacing={2}
                    >
                      {isBuilding && (
                        <Grid item>
                          <CircularProgress />
                        </Grid>
                      )}
                      <Grid item>{buildStatus}</Grid>
                    </Grid>
                  </>
                )}
              </Box>
            </>
          )}
          {buildError && <Typography color="error">{buildError}</Typography>}
          {buildResponse && (
            <Box mt={3}>
              <Typography variant="h5">Built Image:</Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Build At</TableCell>
                    <TableCell id="title">
                      {DateTime.fromFormat(
                        buildResponse.build_at.substr(0, 25),
                        'ccc, dd MMM yyyy TT',
                        {
                          zone: buildResponse.build_at.substr(26),
                          setZone: true,
                        }
                      ).toLocaleString(DateTime.DATETIME_MED)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <br />
              <br />
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Download link</TableCell>
                      <TableCell>Help Text</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {buildResponse.images?.map((i) => {
                      const downloadURL = getAsuDownloadLink(buildResponse.bin_dir, i.name);
                      return (
                        <TableRow key={downloadURL + i.type}>
                          <TableCell>
                            <Link href={downloadURL} target="_blank" data-testid="download_link">
                              <Button
                                endIcon={<CloudDownload />}
                                variant="contained"
                                color="primary"
                              >
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
              <br />
              <br />
              <div>
                <Accordion className="std-accordian">
                  <AccordionSummary expandIcon={<ExpandMore />}>Manifest</AccordionSummary>
                  <AccordionDetails>
                    <code>
                      {Object.keys(buildResponse.manifest).map((e) => (
                        <>
                          {e}: {buildResponse.manifest[e]}
                          <br />
                        </>
                      ))}
                    </code>
                  </AccordionDetails>
                </Accordion>
                <Accordion className="std-accordian">
                  <AccordionSummary expandIcon={<ExpandMore />}>Stderr</AccordionSummary>
                  <AccordionDetails>
                    <textarea rows={15} disabled className="std-textarea">
                      {buildResponse.stderr}
                    </textarea>
                  </AccordionDetails>
                </Accordion>
                <Accordion className="std-accordian">
                  <AccordionSummary expandIcon={<ExpandMore />}>Stdout</AccordionSummary>
                  <AccordionDetails>
                    <textarea rows={15} disabled className="std-textarea">
                      {buildResponse.stdout}
                    </textarea>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default ProfileDetails;
