/* exported config */

const config = {
  // Show help text for images
  show_help: true,

  // Path to overview.json file or URL to the ASU API
  versions: { '19.07.7': 'data/19.07.7', SNAPSHOT: 'data/SNAPSHOT' },

  // Pre-selected version (optional)
  default_version: '19.07.7',

  // Image download URL (optional)
  base_url: 'https://downloads.openwrt.org',
  releases_directory: 'releases',
  target_directory: 'targets',

  // Info link URL (optional)
  info_url: 'https://openwrt.org/start?do=search&id=toh&q={title}',

  // Build custom images (optional)
  // See https://github.com/aparcar/asu
  asu_url: 'https://chef.libremesh.org',
};

export default config;
