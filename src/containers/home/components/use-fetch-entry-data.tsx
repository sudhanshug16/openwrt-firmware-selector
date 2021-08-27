import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Overview, AdditionalProp } from './types';

function UseFetchEntryData() {
  const [entryData, setEntryData] = useState<Overview>();
  const [versions, setVersions] = useState<string[]>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const baseUrl = 'https://asu.aparcar.org';
    const request = async () => {
      try {
        const res = await Axios.get(`${baseUrl}/api/v1/overview`);
        if (res.data) {
          setEntryData(res.data);

          const { branches } = res.data;

          const temp: string[][] = [];
          const arrayFromBranches: [string, AdditionalProp][] = Object.entries(branches);
          arrayFromBranches.forEach((item) => {
            temp.push(item[1].versions);
          });
          setVersions(temp.flat(3));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    request();
  }, []);
  if (!entryData) return;
  return [entryData, versions, { loading }, { error }];
}

export default UseFetchEntryData;
