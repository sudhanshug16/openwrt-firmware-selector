/* exported config */

const config = {
  // Show help text for images
  show_help: true,

  // Path to overview.json file or URL to the ASU API

  // Pre-selected version (optional)
  default_version: '19.07.8',

  // Image download URL (optional)
  base_url: 'https://asu.aparcar.org',
  releases_directory: 'releases',
  target_directory: 'targets',

  // Info link URL (optional)
  info_url: 'https://openwrt.org/start?do=search&id=toh&q={title}',

  // Build custom images (optional)
  // See https://github.com/aparcar/asu
  asu_url: 'https://asu.aparcar.org',
};

export default config;
