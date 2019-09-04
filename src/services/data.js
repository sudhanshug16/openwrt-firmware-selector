import axios from 'axios';

const base_api =
  'https://cors-anywhere.herokuapp.com/https://aparcar.stephen304.com/api/';

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

  buildImage = (board, packages, target, version) =>
    axios.post(base_api + 'build-request', {
      profile: board,
      board,
      defaults: '',
      distro: 'openwrt',
      packages,
      target,
      version,
    });

  buildStatusCheck = request_hash =>
    axios.get(base_api + 'build-request/' + request_hash);

  getFiles = files_url =>
    axios.get('https://chef.libremesh.org' + files_url).then(res => res.data);
}

export default DataService;
