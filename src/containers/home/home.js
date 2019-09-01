import React from 'react';
import {
  AppBar,
  Button,
  Chip,
  CircularProgress,
  ClickAwayListener,
  Container,
  FormControl,
  Grid,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import WarningIcon from '@material-ui/icons/Warning';
import BuildIcon from '@material-ui/icons/Build';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './home.scss';
import { withTranslation } from 'react-i18next';
import FuzzySet from 'fuzzyset.js';

import DataService from '../../services/data';

import AlertDialog from '../../components/alert-dialog';
import ErrorSnackBar from '../../components/error-snackbar';
import SearchTextField from '../../components/device-search';
import PropTypes from 'prop-types';

const buildStatusCheckInterval = 5000;
const confirmationPopupOnBuildResquest = false;

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: '20px 0 0' }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.any,
  dir: PropTypes.any,
};

const sleep = m => new Promise(r => setTimeout(r, m));
const asu = 'https://aparcar.stephen304.com';
const asu_download =
  'https://aparcar.stephen304.com/download/json-demo/openwrt/';

class Home extends React.Component {
  state = {
    selection: {
      version: null,
      device: null,
    },
    showDeviceData: false,
    deviceLoaded: false,
    data: [],
    devicesLoaded: false,
    searchResults: [],
    showSearch: false,
    selectedSearchIndex: 0,
    query: '',
    downloading: false,
    packages: this.packages,
    configChanged: true,
    packageName: '',
    builtDeviceManifest: [],
    builtImages: [],
    isBuilding: false,
    queuePosition: -1,
    showUnexpectedErrorBar: false,
    errorMessage: '',
    fuzzySet: null,
    showAdvanced: true,
    basicInterface: 0,
    errorDialogMessage: <></>,
    openErrorDialog: false,
  };
  confirmingBuild = false;

  dataService = new DataService();

  async componentDidMount() {
    try {
      const versionsResponse = await this.dataService.getVersions();
      let data = versionsResponse.data.versions;
      for (var i = 0; i < data.length; i++) {
        const overviewResponse = await this.dataService.getOverview(
          data[i].path
        );
        data[i].devices = overviewResponse.data.devices;
      }
      this.generateFuzzySet(data[0].devices);
      this.setState({
        data,
        selection: {
          version: 0,
        },
        devicesLoaded: true,
      });
    } catch (err) {
      this.setState({
        showUnexpectedErrorBar: true,
      });
      console.log(err);
    }
  }

  closeUnexpectedErrorBar = () => {
    this.setState({
      showUnexpectedErrorBar: false,
    });
  };

  generateFuzzySet = data => {
    let deviceNames = [];
    Object.keys(data).forEach(deviceName => {
      deviceNames.push(deviceName);
    });
    this.setState({
      fuzzySet: FuzzySet(deviceNames),
    });
  };

  setRelease = event => {
    this.generateFuzzySet(this.state.data[event.target.value].devices);
    this.setState({
      selection: {
        version: event.target.value,
      },
      deviceLoaded: false,
      showDeviceData: false,
      query: '',
    });
  };

  selectDevice = async device_name => {
    const version = this.state.data[this.state.selection.version];
    let selection;
    try {
      let deviceSubPath = version.devices[device_name];
      if (deviceSubPath.indexOf('//') > 0) {
        deviceSubPath = deviceSubPath.replace('//', '/generic/');
      }
      const devicePath = version.path + '/targets/' + deviceSubPath;
      this.setState({
        showDeviceData: true,
        showSearch: false,
        query: device_name,
        basicInterface: 0,
        deviceLoaded: false,
        showAdvanced: false,
        configChanged: true,
      });
      let deviceResponse = await this.dataService.getDeviceData(devicePath);
      selection = this.state.selection;
      selection.device = deviceResponse.data;
      if (selection.device.target[selection.device.target.length - 1] === '/') {
        selection.device.target += 'generic';
      }
    } catch (err) {
      this.setState({
        showUnexpectedErrorBar: true,
      });
      console.log(err);
      return;
    }
    const noPackageFoundError = { error: 'no-packages-found' };
    try {
      let devicePackagesResponse = await this.dataService.getDevicePackages(
        version.name,
        selection.device.target,
        selection.device.id
      );
      if (devicePackagesResponse.data.length === 0) {
        throw noPackageFoundError;
      }
      var packages = devicePackagesResponse.data;
      packages.sort();
      this.setState({
        packages,
        showAdvanced: true,
      });
    } catch (err) {
      this.setState({
        showAdvanced: false,
      });
    }
    this.setState({
      selection,
      deviceLoaded: true,
    });
  };

  search = event => {
    const query = event.target.value;
    this.setState({
      query,
      searchResults: [],
      showSearch: false,
    });
    const deviceNames = this.state.fuzzySet.get(query, undefined, 0);
    let searchResults = [];
    if (deviceNames != null) {
      for (let i = 0; i < deviceNames.length && i < 6; i++) {
        searchResults.push(deviceNames[i][1]);
      }
    }
    this.setState({
      searchResults,
      showSearch: query.length > 0,
    });
  };

  hideSearchResults = () => {
    this.setState({
      showSearch: false,
    });
  };

  changeInterface = (e, val) => {
    this.setState({
      basicInterface: val,
    });
  };

  downloadingImageIndicatorShow = () => {
    this.setState({
      downloading: true,
    });
    setTimeout(() => {
      this.setState({
        downloading: false,
      });
    }, 2000);
  };

  changeAddPackageInput = event => {
    this.setState({
      packageName: event.target.value,
    });
  };

  deletePackage = i => {
    let packages = this.state.packages;
    packages.splice(i, 1);
    this.setState({
      packages,
      configChanged: true,
    });
  };

  addPackage = event => {
    if ((event.which || event.keyCode) === 13 && !event.shiftKey) {
      let packages = this.state.packages;
      const packageArray = this.state.packageName.split(/[,\n]+/);
      packageArray.forEach(package_name => {
        package_name = package_name.replace(' ', '');
        if (package_name !== '' && packages.indexOf(package_name) === -1) {
          packages.push(package_name);
        }
      });
      this.setState({
        packages,
        packageName: '',
        configChanged: true,
      });
    }
  };

  closeConfirmBuildDialog = () => {
    this.confirmingBuild = false;
  };

  openConfirmBuildDialog = () => {
    this.confirmingBuild = true;
  };

  displayBuiltImageData = async buildStatusResponse => {
    const manifestResponse = await this.dataService.getDeviceManifest(
      buildStatusResponse.data.image_folder +
        '/' +
        buildStatusResponse.data.image_prefix +
        '.manifest'
    );

    const builtDeviceManifest = manifestResponse.data.split('\n');

    let builtImages = [];
    buildStatusResponse.data.images.forEach(image => {
      builtImages.push({
        url: asu + buildStatusResponse.data.image_folder + '/' + image.name,
        type: image.type,
      });
    });
    if (this.state.isBuilding) {
      this.setState({
        builtDeviceManifest,
        builtImages,
        configChanged: false,
        isBuilding: false,
      });
    }
  };

  buildImageCheck = async request_hash => {
    try {
      if (!this.state.isBuilding) {
        return;
      }
      const buildStatusResponse = await this.dataService.buildStatusCheck(
        request_hash
      );
      if (buildStatusResponse.status === 202) {
        if (
          buildStatusResponse.headers['X-Build-Queue-Position'] !== undefined
        ) {
          this.setState({
            queuePosition:
              buildStatusResponse.headers['X-Build-Queue-Position'],
          });
        }
        await sleep(buildStatusCheckInterval);
        await this.buildImageCheck(request_hash);
      } else if (buildStatusResponse.status === 200) {
        await this.displayBuiltImageData(buildStatusResponse);
      } else if (buildStatusResponse.status === 409) {
        this.setState({
          openErrorDialog: true,
          errorDialogMessage: (
            <>
              {buildStatusResponse.data.error} <br />
              <a href={buildStatusResponse.data.error}>Build logs</a>
            </>
          ),
        });
      } else {
        throw buildStatusResponse.data;
      }
    } catch (e) {
      if (e.response.status === 409) {
        this.setState({
          isBuilding: false,
          openErrorDialog: true,
          errorDialogMessage: (
            <>
              {e.response.data.error} <br />
              <a
                href={asu + e.response.data.log}
                target="_blank"
                rel="noopener noreferrer"
              >
                Build logs
              </a>
            </>
          ),
        });
      } else if (e.response.status === 422) {
        this.setState({
          isBuilding: false,
          openErrorDialog: true,
          errorDialogMessage: <>{e.response.data.error}</>,
        });
      } else {
        this.setState({
          isBuilding: false,
          showUnexpectedErrorBar: true,
        });
      }
    }
  };

  buildImage = async () => {
    try {
      this.closeConfirmBuildDialog();
      const board = this.state.selection.device.id;
      const packages = this.state.packages;
      const target = this.state.selection.device['target'];
      const version = this.state.data[
        this.state.selection.version
      ].name.toLowerCase();
      this.setState({
        isBuilding: true,
        builtImages: [],
      });
      let buildResponse = await this.dataService.buildImage(
        board,
        packages,
        target,
        version
      );
      if (
        buildResponse.status === 202 &&
        buildResponse.data['request_hash'] !== undefined
      ) {
        const request_hash = buildResponse.data['request_hash'];
        await sleep(buildStatusCheckInterval);
        await this.buildImageCheck(request_hash);
      } else if (buildResponse.status === 200) {
        await this.displayBuiltImageData(buildResponse);
      } else {
        throw buildResponse.data;
      }
    } catch (e) {
      if (e.response.status === 409) {
        this.setState({
          isBuilding: false,
          openErrorDialog: true,
          errorDialogMessage: (
            <>
              {e.response.data.error} <br />
              <a
                href={asu + e.response.data.log}
                target="_blank"
                rel="noopener noreferrer"
              >
                Build logs
              </a>
            </>
          ),
        });
      } else if (e.response.status === 422) {
        this.setState({
          isBuilding: false,
          openErrorDialog: true,
          errorDialogMessage: <>{e.response.data.error}</>,
        });
      } else {
        this.setState({
          isBuilding: false,
          showUnexpectedErrorBar: true,
        });
      }
    }
  };

  cancelBuild = () => {
    this.setState({
      isBuilding: false,
      configChanged: true,
    });
  };

  closeErrorDialog = () => {
    this.setState({
      openErrorDialog: false,
    });
  };

  render() {
    const warning432 = this.state.showDeviceData &&
      this.state.deviceLoaded &&
      parseInt(
        (this.state.selection.device['image_size'] || '').slice(0, -1)
      ) <= 4000 && (
        <Paper className="warning-432" elevation={0}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
              <WarningIcon className="icon" />
            </Grid>
            <Grid item xs>
              {this.props.t('warning432')}
            </Grid>
          </Grid>
        </Paper>
      );
    const notLoaded = <CircularProgress />;
    const onLoad = (
      <>
        <Typography variant="h5">
          {this.props.t('Download OpenWrt firmware for your device!')}
        </Typography>
        <Typography>
          {this.props.t(
            'Please use the input below to download firmware for your device!'
          )}
        </Typography>
        <br />
        <ClickAwayListener onClickAway={this.hideSearchResults}>
          <div className="search-container">
            <FormControl className="version-select">
              <InputLabel htmlFor="version-select" className="version-label">
                {this.props.t('Version')}
              </InputLabel>
              <Select
                value={this.state.selection.version}
                onChange={this.setRelease}
                disabled={this.state.isBuilding}
                input={
                  <OutlinedInput
                    name="version"
                    id="version-select"
                    labelWidth={60}
                  />
                }
              >
                {this.state.data.map((version, i) => (
                  <MenuItem value={i} key={version.revision}>
                    <em>{version.name}</em>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className="search-field">
              <SearchTextField
                id="outlined-adornment-search-devices"
                labeltext={this.props.t('Search your device')}
                value={this.state.query}
                onChange={this.search}
                onClick={this.search}
                disabled={this.state.isBuilding}
              />
              {this.state.showSearch && this.state.searchResults.length !== 0 && (
                <Paper elevation={4} className="search-results">
                  <List>
                    {this.state.searchResults.map(res => {
                      return (
                        <ListItem
                          key={res}
                          button
                          onClick={() => this.selectDevice(res)}
                        >
                          <ListItemText primary={<div>{res}</div>} />
                        </ListItem>
                      );
                    })}
                  </List>
                </Paper>
              )}
              {this.state.searchResults.length === 0 && this.state.showSearch && (
                <Paper elevation={4} className="search-results">
                  <ListItem>
                    <ListItemText primary={this.props.t('No results')} />
                  </ListItem>
                </Paper>
              )}
            </FormControl>
          </div>
        </ClickAwayListener>
        {this.state.showDeviceData && !this.state.deviceLoaded && (
          <>
            <br />
            {notLoaded}
          </>
        )}
        {this.state.showDeviceData && this.state.deviceLoaded && (
          <>
            {warning432}
            <br />
            {this.state.showAdvanced && (
              <AppBar
                className="interface-switch-bar"
                position="relative"
                elevation={0}
              >
                <Tabs
                  value={this.state.basicInterface}
                  onChange={this.changeInterface}
                >
                  <Tab
                    className="interface-switch"
                    label={this.props.t('Basic')}
                    disabled={this.state.isBuilding}
                  />
                  <Tab
                    className="interface-switch"
                    label={this.props.t('Advanced')}
                    disabled={this.state.isBuilding}
                  />
                </Tabs>
              </AppBar>
            )}
            {this.state.basicInterface === 0 ? (
              <TabContainer>
                <Grid container className="device-info">
                  <Grid item xs>
                    {this.props.t('Model')}:{' '}
                    <b> {this.state.selection.device['title']} </b> <br />
                    {this.props.t('Target')}:{' '}
                    {this.state.selection.device['target']} <br />
                    {this.props.t('Version')}:{' '}
                    {this.state.data[this.state.selection.version].name} (
                    {this.state.data[this.state.selection.version].revision})
                  </Grid>
                  <Grid item xs>
                    <b>{this.props.t('Downloads')}: </b>
                    {this.state.selection.device.images.map(image => (
                      <div key={image.name}>
                        <Button
                          className="download-button"
                          href={
                            asu_download +
                            this.state.data[this.state.selection.version].path +
                            '/targets/' +
                            this.state.selection.device.target +
                            '/' +
                            image.name
                          }
                          color="primary"
                          variant="contained"
                          onClick={() => this.downloadingImageIndicatorShow()}
                        >
                          <CloudDownloadIcon className="download-icon" />
                          {
                            image.name
                              .split('-')
                              .reverse()[0]
                              .split('.')[0]
                          }
                        </Button>
                      </div>
                    ))}
                    &nbsp;
                    {this.state.downloading && <CircularProgress size={20} />}
                  </Grid>
                </Grid>
              </TabContainer>
            ) : (
              <TabContainer>
                <Paper elevation={0} className="package-list-input">
                  <div>
                    {this.state.packages.map((package_name, i) => (
                      <Chip
                        className="package"
                        key={package_name + i}
                        size="small"
                        onDelete={() => this.deletePackage(i)}
                        label={package_name}
                      />
                    ))}
                    <Tooltip
                      title={
                        <span>
                          Use comma or new line separated array. <br />
                          Press enter to apply.
                        </span>
                      }
                    >
                      <Input
                        multiline
                        value={this.state.packageName}
                        onKeyUp={this.addPackage}
                        onChange={this.changeAddPackageInput}
                        placeholder={this.props.t('Add package(s)')}
                      />
                    </Tooltip>
                  </div>
                  <br />
                  {this.state.configChanged && !this.state.isBuilding && (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={
                        confirmationPopupOnBuildResquest
                          ? this.openConfirmBuildDialog
                          : this.buildImage
                      }
                    >
                      <BuildIcon />
                      &nbsp;
                      {this.props.t('Build')}
                    </Button>
                  )}
                  {this.state.isBuilding && (
                    <>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={this.cancelBuild}
                      >
                        &nbsp;
                        {this.props.t('Cancel')}
                      </Button>
                      &nbsp; &nbsp;
                      <CircularProgress
                        size={20}
                        style={{ verticalAlign: 'middle' }}
                      />
                      &nbsp; Building image &nbsp;
                      {this.state.queuePosition !== -1 && (
                        <span>
                          {' '}
                          (Position in queue: {this.state.queuePosition}){' '}
                        </span>
                      )}
                      ...
                    </>
                  )}
                  {this.state.builtImages.length > 0 &&
                    !this.state.configChanged && (
                      <Grid container className="device-info">
                        <Grid item xs>
                          {this.props.t('Model')}:{' '}
                          <b> {this.state.selection.device['title']} </b> <br />
                          {this.props.t('Target')}:{' '}
                          {this.state.selection.device['target']} <br />
                          {this.props.t('Version')}:{' '}
                          {this.state.data[this.state.selection.version].name} (
                          {
                            this.state.data[this.state.selection.version]
                              .revision
                          }
                          )
                          <ExpansionPanel
                            className="installed-packages"
                            elevation={0}
                          >
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              id="packages-manifest"
                            >
                              <Typography className="installed-packages-title">
                                Installed Packages (
                                {this.state.builtDeviceManifest.length})
                              </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <div>
                                {this.state.builtDeviceManifest.map(
                                  package_name => (
                                    <div key={package_name}>{package_name}</div>
                                  )
                                )}
                              </div>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                        </Grid>
                        <Grid item xs>
                          <b>{this.props.t('Downloads')}: </b>
                          {this.state.builtImages.map(image => (
                            <div key={image.url}>
                              <Button
                                className="download-button"
                                href={image.url}
                                color="primary"
                                variant="contained"
                                onClick={() =>
                                  this.downloadingImageIndicatorShow()
                                }
                              >
                                <CloudDownloadIcon className="download-icon" />
                                {image.type}
                              </Button>
                            </div>
                          ))}
                          &nbsp;
                          {this.state.downloading && (
                            <CircularProgress size={20} />
                          )}
                        </Grid>
                      </Grid>
                    )}
                </Paper>
              </TabContainer>
            )}
          </>
        )}
      </>
    );
    return (
      <>
        <ErrorSnackBar
          open={this.state.showUnexpectedErrorBar}
          closeHandle={this.closeUnexpectedErrorBar}
        />
        <AlertDialog
          cancelHandler={this.closeConfirmBuildDialog}
          acceptHandler={this.buildImage}
          open={this.confirmingBuild}
          body={
            <>
              {this.props.t(
                'Building image requires computation resources, so we would request you to check if this selection is what you want'
              )}
            </>
          }
          title={this.props.t(
            'Please confirm that you want to perform this action'
          )}
          cancelComponent={this.props.t('Cancel')}
          acceptComponent={
            <>
              {this.props.t('Build')} &nbsp; <BuildIcon />
            </>
          }
        />
        <AlertDialog
          cancelHandler={this.closeErrorDialog}
          open={this.state.openErrorDialog}
          body={this.state.errorDialogMessage}
          title={this.props.t(
            'There is an error with the packages you selected'
          )}
          cancelComponent={this.props.t('Dismiss')}
        />
        <Container className="home-container">
          <Paper className="home-container-paper">
            {this.state.devicesLoaded ? onLoad : notLoaded}
          </Paper>
        </Container>
      </>
    );
  }
}

Home.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(Home);
