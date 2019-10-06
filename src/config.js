const asu_base = 'https://aparcar.stephen304.com';
const defaults = {
  CORSbyPass: 'https://cors-anywhere.herokuapp.com/',
  base_api: asu_base + '/api/',
  asu: asu_base,
  asu_vanilla: asu_base + '/download/json-demo/openwrt/',
};
const prod = {
  i18nDebug: false,
};
const dev = {
  i18nDebug: true,
};
export default {
  ...defaults,
  settings: process.env.NODE_ENV === 'development' ? dev : prod,
};
