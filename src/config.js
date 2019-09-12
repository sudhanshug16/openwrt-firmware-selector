const defaults = {};
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
