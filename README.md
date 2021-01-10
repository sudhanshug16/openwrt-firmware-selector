# OpenWrt Firmware Selector Wizard

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
