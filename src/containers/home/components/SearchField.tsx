import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { CircularProgress, TextField } from '@material-ui/core';
import { Autocomplete, AutocompleteRenderInputParams, FilterOptionsState } from '@material-ui/lab';
import Axios from 'axios';
import { isEqual, throttle } from 'lodash';
import { matchSorter } from 'match-sorter';
import { useTranslation } from 'react-i18next';

import { Overview, ProfilesEntity } from '../../../types/overview';

type Props = {
  selectedVersion: string;
  onProfileChange: (profile: ProfilesEntity) => void;
};

type SearchData = { value: ProfilesEntity; search: string; title: string };

const overviewData: { [key: string]: Overview } = {};

const SearchField: FunctionComponent<Props> = ({ selectedVersion, onProfileChange }) => {
  const [searchData, setSearchData] = useState<SearchData[]>([]);
  const [working, toggleWorking] = useState<boolean>(true);
  const { t } = useTranslation();

  const getSearchData = useCallback(async () => {
    let overview = overviewData[selectedVersion];
    const searchDataArray: SearchData[] = [];

    toggleWorking(true);

    if (!overview) {
      const response = await Axios.get<Overview>(
        `${process.env.PUBLIC_URL}/data/${selectedVersion}/overview.json`
      );
      overview = response.data;
      overviewData[selectedVersion] = overview;
    }

    toggleWorking(false);

    overview.profiles?.forEach((profile) => {
      profile.titles?.forEach((title) => {
        searchDataArray.push({
          value: profile,
          search: profile.id + title.title,
          title: title.title || `${title.vendor} ${title.model}`,
        });
      });
    });

    return searchDataArray;
  }, [selectedVersion]);

  useEffect(() => {
    getSearchData().then((_searchData) => {
      if (!isEqual(_searchData, searchData)) setSearchData(_searchData);
    });
  }, [getSearchData, searchData, selectedVersion]);

  const handleProfileSelect = (_: unknown, searchDataRow: SearchData | null) => {
    if (!searchDataRow) return;
    onProfileChange(searchDataRow.value);
  };

  const getOptionLabel = (option: SearchData) => option.title;

  const renderInput = (params: AutocompleteRenderInputParams) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TextField {...params} fullWidth variant="outlined" label={t('tr-model')} />
  );

  const filterOptions: (
    options: SearchData[],
    state: FilterOptionsState<SearchData>
  ) => SearchData[] = (options, { inputValue }) =>
    throttle(
      () =>
        matchSorter(options, inputValue.replaceAll(' ', ''), {
          keys: ['search'],
        }).slice(0, 10),
      1000
    )() || [];

  if (working) return <CircularProgress />;

  return (
    <Autocomplete
      options={searchData}
      getOptionLabel={getOptionLabel}
      renderInput={renderInput}
      filterOptions={filterOptions}
      onChange={handleProfileSelect}
    />
  );
};

export default SearchField;
