import React, { FunctionComponent } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import config from '../../../config';

type Props = {
  selectedVersion: string;
  onVersionChange: (version: string) => void;
};

const VersionSelector: FunctionComponent<Props> = ({ selectedVersion, onVersionChange }) => {
  const { versions } = config;
  const { t } = useTranslation();

  const handleVersionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const version: string = event.target.value as string;
    onVersionChange(version);
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="version-select-label">{t('tr-version')}</InputLabel>
      <Select
        labelWidth={60}
        labelId="version-select-label"
        value={selectedVersion}
        onChange={handleVersionChange}
      >
        {Object.keys(versions).map((version) => (
          <MenuItem value={version} key={version}>
            {version}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default VersionSelector;
