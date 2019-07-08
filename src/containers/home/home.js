import React from "react";
import { 
  Container, 
  Paper, 
  Typography, 
  InputAdornment, 
  FormControl, 
  TextField, 
  List, 
  ListItem, 
  ListItemText, 
  CircularProgress, 
  Button,
  Grid,
  ClickAwayListener,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Checkbox,
  FormGroup,
  FormControlLabel } from "@material-ui/core";
import { fade, makeStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import WarningIcon from '@material-ui/icons/Warning';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './home.scss';
import { withTranslation } from 'react-i18next';
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
      { classes, 
        endAdornment: (
          <InputAdornment position="start">
            <SearchIcon className={classes.label} />
          </InputAdornment>
        ) 
      }
    } {...props} />
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
  };
  fuzzySet;
  packages = ["opkg","ip6tables","odhcp6c","base-files","mtd","fstools","kmod-leds-gpio","busybox","wpad-mini","kmod-gpio-button-hotplug","kmod-mt76","logd","swconfig","dnsmasq","dropbear","ppp","netifd","ppp-mod-pppoe","uci","libc","uclient-fetch","kmod-ipt-offload","libgcc","odhcpd-ipv6only","iptables","firewall","luci"];

  getDevicesData = () => fetch('https://chef.libremesh.org/download/json/devices.json').then(res => res.json());
  getDeviceData = (device_id) => fetch('https://chef.libremesh.org/download/json/' + device_id + '.json').then(res => res.json());

  componentDidMount() {
    this.getDevicesData().then(data => {
      Object.keys(data['devices']).forEach((device_id) => {
        var device_name = data['devices'][device_id];
        this.deviceNames.push(device_name);
        this.deviceNamesID[device_name] = device_id;
      });
      this.fuzzySet = FuzzySet(this.deviceNames);
      this.setState({
        devices: data['devices'],
        devicesLoaded: true,
      });
    });
    var packages = {};
    this.packages.forEach((package_name) => {
      packages[package_name] = true;
    });
    this.setState({
      packages,
    });
  }

  selectDevice = (device_name) => {
    if (device_name != null) {
      var device_id = this.deviceNamesID[device_name];
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
  }

  search = (event) => {
    const query = event.target.value;
    this.setState({
      query,
      searchResults: [],
      showSearch: false,
    });
    const deviceNames = this.fuzzySet.get(query, undefined, 0);
    var searchResults = [];
    if (deviceNames != null) {
      for (var i = 0; i < deviceNames.length && i < 6; i++) {
        searchResults.push(deviceNames[i][1]);
      }
    }
    this.setState({
      searchResults,
      showSearch: query.length > 0,
    });
  }

  hideSearchResults = () => {
    console.log("bahar")
    this.setState({
      showSearch: false
    });
  }

  packageSettingChange = (event, package_name) => {
    var packages = this.state.packages;
    packages[package_name] = event.target.checked;
    this.setState({
      packages,
    });
  }

  downlodingImageIndicatorShow = (i) => {
    this.setState({
      downloading: true
    });
    setTimeout(() => {
      this.setState({
        downloading: false
      });
    }, 1000)
  }

  render() {
    const warning432 = this.state.showDeviceData && parseInt((this.state.device['image_size'] || '').slice(0, -1)) <= 4000 && (
      <Paper className="warning-432" elevation={0}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <WarningIcon className="icon" />
          </Grid>
          <Grid item xs>
            Devices with ≤4MB flash and/or ≤32MB ram will work but they will be very limited (usually they can't install or run additional packages) because they have low RAM and flash space. Consider this when choosing a device to buy, or when deciding to flash OpenWrt on your device because it is listed as supported.
          </Grid>
        </Grid>
      </Paper>
    );
    const notLoaded = (
      <CircularProgress />
    );
    const onLoad = (
      <>
        <Typography variant="h5">
          {this.props.t('Download OpenWrt firmware for your device!')}
        </Typography>
        <Typography>
          {this.props.t('Please use the input below to download firmware for your device!')}
        </Typography>
        <br />
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
                          } />
                        </ListItem>
                      );
                    })
                  }
                  </List>
                </Paper>
              )
            }
            {
              (this.state.searchResults.length === 0 && this.state.showSearch) && (
                <Paper elevation={4} className="search-results">
                  <ListItem>
                    <ListItemText primary={this.props.t('No results')}></ListItemText>
                  </ListItem>
                </Paper>
              )
            }
          </div>
        </ClickAwayListener>
        {
          this.state.showDeviceData && !this.state.deviceLoaded && (
            <>
              <br />
              { notLoaded }
            </>
          )
        }
        {
          this.state.showDeviceData && this.state.deviceLoaded && (
            <>
            { warning432 }
            <br />
            <Grid container className="device-info">
              <Grid item xs>
                <b>Name: </b> {this.state.device['title']}
              </Grid>
              <Grid item xs>
                <b>Target: </b> {this.state.device['target']}
              </Grid>
              <Grid item xs>
                <b>Subtarget: </b> {this.state.device['subtarget']}
              </Grid>
              <Grid item xs>
                <b>Image Size: </b> {this.state.device['image_size']}
              </Grid>
            </Grid>
            <ExpansionPanel elevation={0} className="advanced-settings">
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Customize Packages (<WarningIcon className="icon" /> for advanced users)</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className="options">
                <FormGroup row>
                {
                  this.packages.map((package_name, i) => {
                    return (
                      <FormControlLabel 
                        key={i}
                        control={
                          <Checkbox
                            onChange={(event) => this.packageSettingChange(event, package_name)}
                            value={this.state.packages[package_name]}
                            checked={this.state.packages[package_name]}
                          />
                        }
                        label={package_name}
                      />
                    )
                  })
                }
                </FormGroup>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            {
              this.state.device.images.map((image, i) => {
                return (
                  <Button
                    key={i}
                    className="download-button"
                    href={"http://downloads.openwrt.org/snapshots/targets/" + this.state.device.target + "/" + this.state.device.subtarget + "/" + image.name}
                    color="primary"
                    variant="contained"
                    onClick={() => this.downlodingImageIndicatorShow()}
                  >
                    <CloudDownloadIcon className="download-icon" />
                    { image.type }
                  </Button>
                );
              })
            }
            &nbsp;
            {
              this.state.downloading && (
                <CircularProgress size={20} />
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
          { this.state.devicesLoaded ? onLoad : notLoaded }
        </Paper>
      </Container>
    );
  }
}

export default withTranslation()(Home);
