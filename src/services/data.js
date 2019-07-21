import axios from 'axios';

const base = 'https://cors-anywhere.herokuapp.com/https://mwarning.de/misc/json/bin';

class DataService {
  getDevicesData = axios.get(
      `${base}/overview.json`)
      .then(res => res.data);

  getDeviceData = (device_id) => axios.get(
      base + '/targets/' + device_id)
      .then(res => res.data);

  getDistributions = axios.get(
      'https://chef.libremesh.org/api/distributions')
      .then(res => res.data);

  buildImage = (board, packages, target, version) => {
    return axios.post('https://chef.libremesh.org/api/build-request', {
      board,
      defaults: '',
      distro: 'openwrt',
      packages,
      target,
      version,
    });
  };

  buildStatusCheck = async (request_hash) => {
    let response = {
      isBuilt: false,
    };
    await axios.get('https://chef.libremesh.org/api/build-request/' + request_hash).then((res) => {
      response.isBuilt = res.status === 202 && res.data.files !== undefined;
      response.status = res.status;
      if (response.isBuilt) {
        response = {...response, data: res.data}
      }
    });
    return response;
  };

  getFiles = (files_url) => axios.get('https://chef.libremesh.org' + files_url).then(res => res.data);

}

export default DataService;
