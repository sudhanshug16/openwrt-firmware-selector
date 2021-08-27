import { CircularProgress, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { ProfilesEntity } from '../../../types/overview';
import useFetchProfiles from './use-fetch-version-profiles';

type Props = {
  selectedVersion: string;
  onProfileChange?: (profile: ProfilesEntity) => void;
  currentBranch: string;
};

type SearchData = { value: ProfilesEntity; search: string; title: string };

const ProfileSearch: FunctionComponent<Props> = ({ selectedVersion }) => {
  const { t } = useTranslation();
  const profiles = useFetchProfiles(selectedVersion);

  const modelSearchData = (profiles[0] as unknown) as SearchData[];

  if (!modelSearchData) return <CircularProgress />;

  return (
    <Autocomplete
      data-testid="search-autocomplete"
      options={modelSearchData}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => (
        <TextField {...params} fullWidth variant="outlined" label={t('tr-model')} />
      )}
      renderOption={(option, { inputValue }) => {
        const matches = match(option.title, inputValue);
        const parts = parse(option.title, matches);
        return (
          <div>
            {parts.map((part, index) => (
              <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                {part.text}
              </span>
            ))}
          </div>
        );
      }}
    />
  );
};

export default ProfileSearch;
