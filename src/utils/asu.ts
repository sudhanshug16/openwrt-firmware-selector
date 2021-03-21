import api from './api';
import { sleep } from './common';

const build = async (
  packages: string[],
  profile: string,
  version: string,
  buildStatusCallback: (status: string) => void
) => {
  const buildResponse = await api.asu.buildNew(packages, profile, version);
  if (buildResponse.status === 202) {
    buildStatusCallback(`#${buildResponse} in queue`);
  }

  while (true) {
    const checkBuildResponse = await api.asu.checkBuild(buildResponse.data.request_hash);
    if (checkBuildResponse.status === 200) {
      return checkBuildResponse.data;
    } else if (checkBuildResponse.status === 202) {
      if (checkBuildResponse.data.status === 'queued') {
        buildStatusCallback(`#${buildResponse} in queue`);
      } else if (checkBuildResponse.data.status === 'started') {
        buildStatusCallback(`Building the image`);
      }
    }

    await sleep(5000);
  }
};

export default { build };
