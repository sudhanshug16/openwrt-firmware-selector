import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import config from '../../../config';
import ProfileDetails from './ProfileDetails';
import ProfileSearch from './ProfileSearch';
import { AdditionalProp, Branches, Overview } from './types';

type Props = {
  initialVersion?: string;
  versions: string[];
  branchVersion: Overview[];
};

const VersionSelector: FC<Props> = ({ versions, branchVersion }) => {
  const [version, setVersion] = useState<string>();
  const { t } = useTranslation();

  const handleVersionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const version = event.target.value as string;
    setVersion(version);
  };

  const { default_version } = config;

  const currentBranch = branchVersion.map((item) =>
    Object.entries(item.branches).filter((branch) =>
      version ? version.includes(branch[0]) : default_version?.includes(branch[0])
    )
  );

  // console.log(branchVersion);

  // const version_foo = version ? version : default_version;

  // const currentBranch =
  //   branchVersion[0]['branches'][
  //     version_foo.replace('-SNAPSHOT', '').split('.').slice(0, 2).join('.') as string
  //   ];

  const b = currentBranch?.flat(2)[1];
  const { path } = b as any;

  if (!default_version) return <p>Loading</p>;
  return (
    <Grid container spacing={2} direction="row-reverse">
      <Grid item xs={12} md={3}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="version-select-label">{t('tr-version')}</InputLabel>
          <Select
            labelWidth={60}
            labelId="version-select-label"
            value={version ?? default_version}
            onChange={handleVersionChange}
            data-testid="version-select"
          >
            {versions.map((version, index) => (
              <MenuItem value={version} key={index}>
                {version}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md>
        <ProfileSearch
          selectedVersion={version ? version : default_version}
          currentBranch={currentBranch.flat(2)[0] as string}
          path={path}
        />
      </Grid>
    </Grid>
  );
};

export default VersionSelector;
