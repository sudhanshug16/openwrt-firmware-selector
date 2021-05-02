# OpenWrt Firmware Selector [![codecov](https://codecov.io/gh/sudhanshu16/openwrt-firmware-selector/branch/master/graph/badge.svg?token=F26634D0PG)](https://codecov.io/gh/sudhanshu16/openwrt-firmware-selector)

A simple OpenWrt firmware selector using autocompletion.

## Features

- Easily search devices
- Option to download Vanilla images
- Option to download custom images

## Setting up

You can set it up easily:

1. Clone the repository
2. Use [yarn](https://yarnpkg.com/en/) to install package dependencies  
   `yarn install`
3. Run `scripts/collect.py` to generate required JSON files.

   Format:

   ```sh
   ./scripts/collect.py --image-url <image_url> <release_src> <config_path> <output_path>
   ```

   Example:

   ```sh
   ./scripts/collect.py --image-url 'https://downloads.openwrt.org/{base}/{target}' https://downloads.openwrt.org ./src ./public/
   ```

4. Use the following command to start a dev server:  
   `yarn start`

## Deployment

In order to deploy the web app, follow the following steps:

- For gh-pages:

  1. `yarn deploy`
  2. Enable Github Pages setting to use gh-pages branch.

- Elsewhere:
  1. Build the app using:  
     `yarn build`
  2. Host the files from `/build` directory.

## [LICENSE](LICENSE)
