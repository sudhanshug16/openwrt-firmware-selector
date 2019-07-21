import React from 'react';
import {
  AppBar,
  Button,
  Chip,
  CircularProgress,
  ClickAwayListener,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Snackbar,
  SnackbarContent,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {fade, makeStyles} from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import WarningIcon from '@material-ui/icons/Warning';
import BuildIcon from '@material-ui/icons/Build';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import './home.scss';
import {withTranslation} from 'react-i18next';
import FuzzySet from 'fuzzyset.js';

import DataService from '../../services/data';

const buildStatusCheckInterval = 5000;

const useStylesSearch = makeStyles(theme => ({
  root: {
    borderColor: '#e2e2e1',
    overflow: 'hidden',
    margin: 0,
    borderRadius: 4,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      borderColor: fade(theme.palette.primary.main, 0.25),
    },
    '&$focused': {
      backgroundColor: '#fff',
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
  focused: {},
}));

const SnackBarStyles = makeStyles(theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: '20px',
    fontSize: 20,
  },
}));

function ErrorSnackBar({open, closeHandle, errorMessage}) {
  const classes = SnackBarStyles();
  return (
      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={closeHandle}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
      >
        <SnackbarContent
            className={classes.error}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={classes.message}>
                <ErrorIcon className={classes.icon}/>
                {errorMessage ||
                'An unexpected error occurred. Please try again'}
              </span>
            }
            action={[
              <IconButton key="close" aria-label="Close" color="inherit"
                          onClick={closeHandle}>
                <CloseIcon/>
              </IconButton>,
            ]}
        />
      </Snackbar>
  );
}

function SearchTextField(props) {
  const classes = useStylesSearch();

  return (
      <TextField
          variant="outlined"
          label={
            <div className="search-label">
              {props.labeltext}
            </div>
          }
          InputProps={
            {
              classes,
              endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className={classes.label}/>
                  </InputAdornment>
              ),
            }
          } {...props} />
  );
}

function TabContainer({children, dir}) {
  return (
      <Typography component="div" dir={dir} style={{padding: '20px 0 0'}}>
        {children}
      </Typography>
  );
}

function AlertDialog({open, cancelHandler, acceptHandler, text, title, cancelComponent, acceptComponent}) {
  return (
      <Dialog
          open={open}
          onClose={cancelHandler}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        <DialogTitle
            id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={acceptHandler} color="primary">
            {acceptComponent}
          </Button>
          <Button onClick={cancelHandler} color="secondary"
                  variant="contained" autoFocus>
            {cancelComponent}
          </Button>
        </DialogActions>
      </Dialog>
  );
}

class Home extends React.Component {

  packages = [
    'opkg',
    'ip6tables',
    'odhcp6c',
    'base-files',
    'mtd',
    'fstools',
    'kmod-leds-gpio',
    'busybox',
    'wpad-mini',
    'kmod-gpio-button-hotplug',
    'kmod-mt76',
    'logd',
    'swconfig',
    'dnsmasq',
    'dropbear',
    'ppp',
    'netifd',
    'ppp-mod-pppoe',
    'uci',
    'libc',
    'uclient-fetch',
    'kmod-ipt-offload',
    'libgcc',
    'odhcpd-ipv6only',
    'iptables',
    'firewall',
    'luci'];
  deviceNames = [];
  deviceNamesID = {};
  checkBuildStatus;
  state = {
    showDeviceData: false,
    device: {},
    deviceLoaded: false,
    devices: [],
    devicesLoaded: false,
    searchResults: [],
    showSearch: false,
    selectedSearchIndex: 0,
    query: '',
    downloading: false,
    packages: this.packages,
    distributions: {
      versions: {},
    },
    configChanged: true,
    packageName: '',
    release: '',
    builtImages: [],
    isBuilding: false,
    showUnexpectedErrorBar: false,
  };

  fuzzySet;
  basicInterface = 0;
  confirmingBuild = false;

  dataService = new DataService();

  componentDidMount() {
    this.dataService.getDistributions.then(distros => {
      this.setState({
        distributions: distros['openwrt'],
        release: distros['openwrt']['latest'],
      });
      this.dataService.getDevicesData.then(data => {
        Object.keys(data['devices']).forEach((device_name) => {
          // const device_name = data['devices'][device_id];
          // this.deviceNames.push(device_name);
          // this.deviceNamesID[device_name] = device_id;
          const device_id = data['devices'][device_name];
          this.deviceNames.push(device_name);
          this.deviceNamesID[device_name] = device_id;
        });
        this.fuzzySet = FuzzySet(this.deviceNames);
        this.setState({
          devices: data['devices'],
          devicesLoaded: true,
        });
      });
    });
  }

  closeUnexpectedErrorBar = () => {
    this.setState({
      showUnexpectedErrorBar: false,
    });
  };

  setRelease = (event) => {
    this.setState({
      release: event.target.value,
    });
  };

  selectDevice = (device_name) => {
    if (device_name != null) {
      const device_id = this.deviceNamesID[device_name];
      this.setState({
        showDeviceData: true,
        showSearch: false,
        query: device_name,
        deviceLoaded: false,
      });
      this.dataService.getDeviceData(device_id).then(data => {
        this.setState({
          device: data,
          deviceLoaded: true,
        });
      });
    }
  };

  search = (event) => {
    const query = event.target.value;
    this.setState({
      query,
      searchResults: [],
      showSearch: false,
    });
    const deviceNames = this.fuzzySet.get(query, undefined, 0);
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
    this.basicInterface = val;
  };

  downloadingImageIndicatorShow = (i) => {
    this.setState({
      downloading: true,
    });
    setTimeout(() => {
      this.setState({
        downloading: false,
      });
    }, 2000);
  };

  changeAddPackageInput = (event) => {
    this.setState({
      packageName: event.target.value,
    });
  };

  deletePackage = (i) => {
    let packages = this.state.packages;
    packages.splice(i, 1);
    this.setState({
      packages,
      configChanged: true
    });
  };

  addPackage = (event) => {
    if ((event.which || event.keyCode) === 13 && !event.shiftKey) {
      let packages = this.state.packages;
      const packageArray = this.state.packageName.split(/[,\n]+/);
      packageArray.forEach((package_name) => {
        package_name = package_name.replace(' ', '');
        if (package_name !== '') {
          packages.push(package_name);
        }
      });
      this.setState({
        packages,
        packageName: '',
        configChanged: true
      });
    }
  };

  closeConfirmBuildDialog = (v) => {
    this.confirmingBuild = false;
  };

  openConfirmBuildDialog = () => {
    this.confirmingBuild = true;
  };

  displayBuiltImageData = async (buildStatusResponse) => {
    console.log(buildStatusResponse);
    await this.dataService.getFiles(buildStatusResponse.data.files)
        .then((fileListResponse) => {
          let builtImages = [];
          fileListResponse.forEach((file) => {
            const suffix = file.name.substring(file.name.length - 4);
            if (suffix === '.bin') {
              const type = file.name.split('-').reverse()[0].split('.')[0];
              builtImages.push({
                url: 'https://chef.libremesh.org' +
                    buildStatusResponse.data.files + file.name,
                type,
              });
            }
          });
          this.setState({
            builtImages,
            configChanged: false,
            isBuilding: false,
          });
        });
    clearTimeout(this.checkBuildStatus);
  };

  buildImageCheck = async (request_hash) => {
    const buildStatusResponse = await this.dataService.buildStatusCheck(
        request_hash);
    if (buildStatusResponse.status === 202) {
      this.checkBuildStatus = setTimeout(
          () => {
            this.buildImageCheck(request_hash);
          }, buildStatusCheckInterval,
      );
    } else if (buildStatusResponse.status === 200) {
      await this.displayBuiltImageData(buildStatusResponse);
    } else {
      this.setState({
        isBuilding: false,
        showUnexpectedErrorBar: true,
      });
    }
  };

  buildImage = async () => {
    this.closeConfirmBuildDialog();
    const board = this.state.device.id;
    const packages = this.state.packages;
    const target = this.state.device.target + '/' + this.state.device.subtarget;
    const version = this.state.release;
    this.setState({
      isBuilding: true,
      builtImages: [],
    });
    this.dataService.buildImage(board, packages, target, version).then(async res => {
      if (res.status === 202 && res.data['request_hash'] !== undefined) {
        const request_hash = res.data['request_hash'];
        this.checkBuildStatus = setTimeout(
            async () => {
              await this.buildImageCheck(request_hash);
            }, buildStatusCheckInterval,
        );
      } else if (res.status === 200) {
        await this.displayBuiltImageData(res);
      } else {
        this.setState({
          isBuilding: false,
          showUnexpectedErrorBar: true,
        });
      }
    }).catch(() => {
      this.setState({
        isBuilding: false,
        showUnexpectedErrorBar: true,
      });
    });
  };

  render() {
    const warning432 = this.state.showDeviceData &&
        parseInt(
            (this.state.device['image_size'] || '').slice(0, -1)) <= 4000 && (
            <Paper className="warning-432" elevation={0}>
              <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
              >
                <Grid item>
                  <WarningIcon className="icon"/>
                </Grid>
                <Grid item xs>
                  {this.props.t(
                      'Devices with ≤4MB flash and/or ≤32MB ram will work but they will be very limited (usually they can\'t install or run additional packages) because they have low RAM and flash space. Consider this when choosing a device to buy, or when deciding to flash OpenWrt on your device because it is listed as supported.')}
                </Grid>
              </Grid>
            </Paper>
        );
    const notLoaded = (
        <CircularProgress/>
    );
    const onLoad = (
        <>
          <Typography variant="h5">
            {this.props.t('Download OpenWrt firmware for your device!')}
          </Typography>
          <Typography>
            {this.props.t(
                'Please use the input below to download firmware for your device!')}
          </Typography>
          <br/>
          <ClickAwayListener onClickAway={this.hideSearchResults}>
            <div className="search-container">
              <FormControl className="version-select">
                <InputLabel htmlFor="version-select" className="version-label">
                  {this.props.t('Version')}
                </InputLabel>
                <Select
                    value={this.state.release}
                    onChange={this.setRelease}
                    input={<OutlinedInput name="version"
                                          id="version-select" labelWidth={60}/>}
                >
                  {
                    Object.keys(this.state.distributions['versions'])
                        .map((version) => (
                                <MenuItem value={version} key={version}>
                                  <em>{version}</em>
                                </MenuItem>
                            ),
                        )
                  }
                </Select>
              </FormControl>
              <FormControl className="search-field">
                <SearchTextField
                    id="outlined-adornment-search-devices"
                    labeltext={this.props.t('Search your device')}
                    value={this.state.query}
                    onChange={this.search}
                    onClick={this.search}
                />
                {
                  this.state.showSearch && this.state.searchResults.length !==
                  0 && (
                      <Paper elevation={4} className="search-results">
                        <List>
                          {
                            this.state.searchResults.map((res, index) => {
                              return (
                                  <ListItem
                                      key={res}
                                      button
                                      onClick={() => this.selectDevice(res)}
                                  >
                                    <ListItemText primary={
                                      <div>
                                        {res}
                                      </div>
                                    }/>
                                  </ListItem>
                              );
                            })
                          }
                        </List>
                      </Paper>
                  )
                }
                {
                  (this.state.searchResults.length === 0 &&
                      this.state.showSearch) && (
                      <Paper elevation={4} className="search-results">
                        <ListItem>
                          <ListItemText
                              primary={this.props.t('No results')}/>
                        </ListItem>
                      </Paper>
                  )
                }
              </FormControl>
            </div>
          </ClickAwayListener>
          {
            this.state.showDeviceData && !this.state.deviceLoaded && (
                <>
                  <br/>
                  {notLoaded}
                </>
            )
          }
          {
            this.state.showDeviceData && this.state.deviceLoaded && (
                <>
                  {warning432}
                  <br/>
                  <Grid container className="device-info">
                    <Grid item xs>
                      <b>{this.props.t(
                          'Name')}: </b> {this.state.device['title']}({this.state.device['target']}/{this.state.device['subtarget']})
                    </Grid>
                    <Grid item xs>
                      <b>{this.props.t(
                          'Release Version')}: </b> {this.state.release_version_number}
                    </Grid>
                  </Grid>
                  <AppBar className="interface-switch-bar" position="relative"
                          elevation={0}>
                    <Tabs value={this.basicInterface}
                          onChange={this.changeInterface}>
                      <Tab className="interface-switch"
                           label={this.props.t('Basic')}/>
                      <Tab className="interface-switch"
                           label={this.props.t('Advanced')}/>
                    </Tabs>
                  </AppBar>
                  {
                    this.basicInterface === 0 ? (
                        <TabContainer>
                          {
                            this.state.device.images.map((image, i) => {
                              return (
                                  <Button
                                      key={i}
                                      className="download-button"
                                      href={'http://downloads.openwrt.org/snapshots/targets/' +
                                      this.state.device.target + '/' +
                                      this.state.device.subtarget + '/' +
                                      image.name}
                                      color="primary"
                                      variant="contained"
                                      onClick={() => this.downloadingImageIndicatorShow()}
                                  >
                                    <CloudDownloadIcon
                                        className="download-icon"/>
                                    {image.type}
                                  </Button>
                              );
                            })
                          }
                          &nbsp;
                          {
                            this.state.downloading && (
                                <CircularProgress size={20}/>
                            )
                          }
                        </TabContainer>
                    ) : (
                        <TabContainer>
                          <Paper elevation={0} className="package-list-input">
                            <div>
                              {
                                this.state.packages.map((package_name, i) => {
                                  return (
                                      <Chip className="package"
                                            key={package_name + i}
                                            size="small"
                                            onDelete={() => this.deletePackage(
                                                i)}
                                            label={package_name}
                                      />
                                  );
                                })
                              }
                              <Tooltip
                                  title={<span>Use comma or new line separated array.  <br/>Press enter to apply.</span>}>
                                <Input
                                    multiline
                                    value={this.state.packageName}
                                    onKeyUp={this.addPackage}
                                    onChange={this.changeAddPackageInput}
                                    placeholder={this.props.t('Add package(s)')}
                                />
                              </Tooltip>
                            </div>
                            <br/>
                            {
                              this.state.configChanged && !this.state.isBuilding && (
                                  <Button variant="outlined" color="primary"
                                          onClick={this.openConfirmBuildDialog}>
                                    <BuildIcon/>
                                    &nbsp;
                                    {this.props.t('Build')}
                                  </Button>
                              )
                            }
                            {
                              this.state.isBuilding && (
                                  <CircularProgress size={20}/>
                              )
                            }
                            {
                              this.state.builtImages.length > 0 && !this.state.configChanged && (
                                  <>
                                    {
                                      this.state.builtImages.map((image) => (
                                          <Button
                                              key={image.url}
                                              className="download-button"
                                              href={image.url}
                                              color="primary"
                                              variant="contained"
                                              onClick={() => this.downloadingImageIndicatorShow()}
                                          >
                                            <CloudDownloadIcon
                                                className="download-icon"/>
                                            {image.type}
                                          </Button>
                                      ))
                                    }
                                    &nbsp;
                                    {
                                      this.state.downloading && (
                                          <CircularProgress size={20}/>
                                      )
                                    }
                                  </>
                              )
                            }
                          </Paper>
                        </TabContainer>
                    )
                  }
                </>
            )
          }
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
              text={this.props.t(
                  'Building image requires computation resources, so we would request you to check if this selection is what you want')}
              title={this.props.t(
                  'Please confirm that you want to perform this action')}
              cancelComponent={this.props.t('Cancel')}
              acceptComponent={
                <>
                  {this.props.t('Build')} &nbsp; <BuildIcon/>
                </>
              }
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

export default withTranslation()(Home);
