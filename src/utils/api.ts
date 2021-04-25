import axios from 'axios';
import config from '../config';
import { GetBuildResponse } from '../types/asu';

const asu = {
  buildNew: (packages: string[], target: string, profile: string, version: string) =>
    axios.post<GetBuildResponse>(`${config.asu_url}/api/build`, {
      target,
      version,
      profile,
      packages,
      diff_packages: true,
    }),
  checkBuild: (request_hash: string) =>
    axios.get<GetBuildResponse>(`${config.asu_url}/api/build/${request_hash}`),
};

export default { asu };
