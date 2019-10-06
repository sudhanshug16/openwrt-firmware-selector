import axios from 'axios';
import config from '../config';

const { CORSbyPass, base_api: api } = config;
const base_api = CORSbyPass + api;

class DataService {
  getVersions = versionsPath => axios.get(versionsPath);

  getOverview = overviewPath => axios.get(overviewPath);

  getDeviceData = devicePath => axios.get(devicePath);

  getDeviceManifest = async manifest_path => {
    const manifest = await axios.get(manifest_path);
    return manifest.data.split('\n');
  };

  getDevicePackages = (version, target, profile) =>
    axios.get(
      base_api +
        'packages_image?distro=openwrt&version=' +
        version.toLowerCase() +
        '&target=' +
        target +
        '&profile=' +
        profile.toLowerCase()
    );

  buildImage = (board, packages, target, version, uciDefaults) =>
    axios.post(base_api + 'build-request', {
      profile: board,
      board,
      defaults: uciDefaults,
      distro: 'openwrt',
      packages,
      target,
      version,
    });

  buildStatusCheck = request_hash =>
    axios.get(base_api + 'build-request/' + request_hash);
}

export default DataService;
