import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import config from '../../../config';
import ProfileSearch from './ProfileSearch';
import { Overview } from './types';

type Props = {
  initialVersion?: string;
  versions: string[];
  branchVersion: Overview[];
};

const VersionSelector: FunctionComponent<Props> = ({ versions, branchVersion }) => {
  const [version, setVersion] = useState<string>();
  const { t } = useTranslation();

  const handleVersionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const version = event.target.value as string;
    setVersion(version);
  };

  const { default_version } = config;

  const currentBranch = branchVersion.map((item) =>
    Object.entries(item.branches).find((branch) =>
      version ? version.includes(branch[0]) : default_version?.includes(branch[0])
    )
  );

  if (!default_version) return <p>Loading</p>;
  return (
    <>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="version-select-label">{t('tr-version')}</InputLabel>
        <Select
          labelWidth={60}
          labelId="version-select-label"
          value={version ? version : default_version}
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
      <ProfileSearch
        selectedVersion={version ? version : default_version}
        currentBranch={currentBranch.flat(2)[0] as string}
      />
    </>
  );
};

export default VersionSelector;
