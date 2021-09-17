import Axios from 'axios';
import { useEffect, useState } from 'react';
import config from '../../../config';
import { TitlesEntity } from '../../../types/overview';
import { getTitle } from '../utils/title';

function UseFetchProfiles(version: string) {
  const [modelSearchData, setModelSearchData] = useState<Array<any>>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!version) return;
    const { base_url } = config;
    const request = async () => {
      try {
        const res = await Axios.get(`${base_url}/json/v1/releases/${version}/overview.json`);

        const versionProfiles = res.data.profiles;

        const emptyArray: {
          value: { titles: TitlesEntity[]; id: string };
          search: string;
          title: string;
        }[] = [];
        versionProfiles.forEach((profile: { titles: TitlesEntity[]; id: string }) => {
          profile.titles.forEach((titleEntity: TitlesEntity) => {
            const title = getTitle(titleEntity);
            emptyArray.push({
              value: profile,
              search: profile.id + title,
              title,
            });
          });
        });
        setModelSearchData(emptyArray);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    request();
  }, [version]);
  return [modelSearchData, { loading }, { error }];
}

export default UseFetchProfiles;
