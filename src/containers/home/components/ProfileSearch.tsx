import { CircularProgress, Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProfilesEntity } from '../../../types/overview';
import ProfileDetails from './ProfileDetails';
import useFetchProfiles from './use-fetch-version-profiles';

type Props = {
  selectedVersion: string;
  onProfileChange?: (profile: ProfilesEntity) => void;
  currentBranch: string;
  path: string;
};

export type SearchData = { value: ProfilesEntity; search: string; title: string };

const ProfileSearch: FC<Props> = ({ selectedVersion, path }) => {
  const { t } = useTranslation();
  const profiles = useFetchProfiles(selectedVersion, path);
  const [selectedModel, setSelectedModel] = useState<SearchData | null>();

  const modelSearchData = (profiles[0] as unknown) as SearchData[];

  if (!modelSearchData) return <CircularProgress />;

  return (
    <>
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
        onChange={(e, selectedItem) => {
          setSelectedModel(selectedItem);
        }}
      />
      {selectedModel && (
        <Grid item xs={12} md>
          <ProfileDetails
            path={path}
            selectedProfile={selectedModel.value}
            selectedVersion={selectedVersion}
          />
        </Grid>
      )}
    </>
  );
};

export default ProfileSearch;
