import axios from 'axios';

const base_downloads =
  'https://cors-anywhere.herokuapp.com/https://aparcar.stephen304.com/download/json-demo/openwrt/';
const base_api =
  'https://cors-anywhere.herokuapp.com/https://aparcar.stephen304.com/api/';

class DataService {
  getVersions = () => axios.get(base_downloads + 'versions.json');

  getOverview = path => axios.get(base_downloads + path + '/overview.json');

  getDeviceData = device_path => axios.get(base_downloads + device_path);

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
