import Axios from 'axios';
import { useEffect, useState } from 'react';

export type Overview = {
  enabled: boolean;
  extra_repos: [];
  git_branch: string;
  name: string;
  path: string;
  path_packages: string;
  pubkey: string;
  repos: Array<string>;
  targets: [];
};

export type EntryData = {
  version: string;
  entryData: Overview;
  loading: boolean;
  error: string;
};

function UseFetchEntryData(selectedVersion: string) {
  const [entryData, setEntryData] = useState<EntryData>();
  const [version, setVersion] = useState<string>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const baseUrl = 'https://asu.aparcar.org';
    const request = async () => {
      try {
        const res = await Axios.get(`${baseUrl}/api/v1/overview`);
        const { branches } = res.data;
        const filteredByVersion: any = Object.fromEntries(
          Object.entries(branches).filter(([key]) => selectedVersion.includes(key))
        );
        const data = filteredByVersion[Object.keys(filteredByVersion).join('')];
        setEntryData(data);
        setVersion(data.versions[0]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    request();
  }, []);
  return [{ entryData }, version, { loading }, { error }];
}

export default UseFetchEntryData;
