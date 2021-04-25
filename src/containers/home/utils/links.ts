import config from '../../../config';

export const getAsuDownloadLink = (bin_dir: string, name: string) => {
  return `${config.asu_url}/store/${bin_dir}/${name}`;
};

export const getStockDownloadLink = (version: string, target: string, name: string) => {
  return `${config.base_url}/${
    version === 'SNAPSHOT' ? 'snapshots' : `${config.releases_directory}/${version}`
  }/${config.target_directory}/${target}/${name}`;
};
