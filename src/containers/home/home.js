import React from 'react';
import {
  AppBar,
  Button,
  Checkbox,
  CircularProgress,
  ClickAwayListener,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@material-ui/core';
import {fade, makeStyles} from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import WarningIcon from '@material-ui/icons/Warning';
import BuildIcon from '@material-ui/icons/Build';
import './home.scss';
import {withTranslation} from 'react-i18next';
import FuzzySet from 'fuzzyset.js';

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

function AlertDialog({open, handleClose, text, title, t}) {
  return (
      <Dialog
          open={open}
          onClose={() => handleClose(-1)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        <DialogTitle
            id="alert-dialog-title">{t(title)}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t(text)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(1)} color="primary">
            {t('Build')} &nbsp; <BuildIcon/>
          </Button>
          <Button onClick={() => handleClose(0)} color="secondary"
                  variant="contained" autoFocus>
            {t('Cancel')}
          </Button>
        </DialogActions>
      </Dialog>
  );
}

class Home extends React.Component {

  deviceNames = [];
  deviceNamesID = {};
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
    packages: {},
    release_version_number: '',
  };
  fuzzySet;
  basicInterface = 0;
  confirmingBuild = false;
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

  getDevicesData = () => fetch(
      'https://chef.libremesh.org/download/json/devices.json')
      .then(res => res.json());
  getDeviceData = (device_id) => fetch(
      'https://chef.libremesh.org/download/json/' + device_id + '.json')
      .then(res => res.json());

  componentDidMount() {
    this.getDevicesData().then(data => {
      Object.keys(data['devices']).forEach((device_id) => {
        const device_name = data['devices'][device_id];
        this.deviceNames.push(device_name);
        this.deviceNamesID[device_name] = device_id;
      });
      this.fuzzySet = FuzzySet(this.deviceNames);
      this.setState({
        devices: data['devices'],
        devicesLoaded: true,
        release_version_number: data['version_number'],
      });
    });
    let packages = {};
    this.packages.forEach((package_name) => {
      packages[package_name] = true;
    });
    this.setState({
      packages,
    });
  }

  selectDevice = (device_name) => {
    if (device_name != null) {
      const device_id = this.deviceNamesID[device_name];
      this.setState({
        showDeviceData: true,
        showSearch: false,
        query: device_name,
        deviceLoaded: false,
      });
      this.getDeviceData(device_id).then(data => {
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

  packageSettingChange = (event, package_name) => {
    let packages = this.state.packages;
    packages[package_name] = event.target.checked;
    this.setState({
      packages,
    });
  };

  downloadingImageIndicatorShow = (i) => {
    this.setState({
      downloading: true,
    });
    setTimeout(() => {
      this.setState({
        downloading: false,
      });
    }, 1000);
  };

  closeConfirmBuildDialog = (v) => {
    this.confirmingBuild = false;
    console.log(v);
  };

  openConfirmBuildDialog = () => {
    this.confirmingBuild = true;
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
              <FormControl fullWidth>
                <SearchTextField
                    id="outlined-adornment-search-devices"
                    labeltext={this.props.t('Search your device')}
                    value={this.state.query}
                    onChange={this.search}
                    onClick={this.search}
                />
              </FormControl>
              {
                this.state.showSearch && (
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
                          <FormGroup row>
                            {
                              this.packages.map((package_name, i) => {
                                return (
                                    <FormControlLabel
                                        className="package"
                                        key={i}
                                        control={
                                          <Checkbox
                                              onChange={(event) => this.packageSettingChange(
                                                  event, package_name)}
                                              value={this.state.packages[package_name]}
                                              checked={this.state.packages[package_name]}
                                          />
                                        }
                                        label={package_name}
                                    />
                                );
                              })
                            }
                          </FormGroup>
                          <br/>
                          <Button variant="outlined" color="primary"
                                  onClick={this.openConfirmBuildDialog}>
                            <BuildIcon/>
                            &nbsp;
                            {this.props.t('Build')}
                          </Button>
                        </TabContainer>
                    )
                  }
                </>
            )
          }
        </>
    );
    return (
        <Container className="home-container">
          <Paper className="home-container-paper">
            <AlertDialog handleClose={this.closeConfirmBuildDialog}
                         open={this.confirmingBuild}
                         text="Building image requires computation resources, so we would request you to check if this selection is what you want"
                         title="Please confirm that you want to perform this action"
                         t={this.props.t}/>
            {this.state.devicesLoaded ? onLoad : notLoaded}
          </Paper>
        </Container>
    );
  }
}

export default withTranslation()(Home);
