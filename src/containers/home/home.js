import React from "react";
import { Container, Paper, Typography, InputAdornment, FormControl, TextField, List, ListItem, ListItemText, CircularProgress, Button } from "@material-ui/core";
import { fade, makeStyles } from '@material-ui/core/styles';


import SearchIcon from '@material-ui/icons/Search';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
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
    device: null,
    deviceLoaded: false,
    devices: [],
    devicesLoaded: false,
    searchResults: [],
    showSearch: false,
    selectedSearchIndex: 0,
    query: '',
    downloading: false,
  };
  fuzzySet;

  getDevicesData = () => fetch('https://chef.libremesh.org/download/json/devices.json').then(res => res.json());
  getDeviceData = (device_id) => fetch('https://chef.libremesh.org/download/json/' + device_id + '.json').then(res => res.json());

  componentDidMount() {
    this.getDevicesData().then(data => {
      Object.keys(data['devices']).forEach((device_name) => {
        this.deviceNames.push(device_name);
        this.deviceNamesID[device_name] = data['devices'][device_name];
      });
      this.fuzzySet = FuzzySet(this.deviceNames);
      this.setState({
        devices: data['devices'],
        devicesLoaded: true,
      });
    });
  }

  selectDevice = (device_name) => {
    if (device_name != null) {
      this.setState({
        showDeviceData: true,
        showSearch: false,
        query: device_name,
        deviceLoaded: false,
      });
      this.getDeviceData(this.state.devices[device_name]).then(data => {
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
      showSearch: true,
    });
  }

  isDescendant = (parent, child) => {
    var node = child.parentNode;
    if (child === parent) {
        return true;
    }
    while (node !== null) {
        if (node === parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
  }

  toggleSearchIfIntended = (event) => {
    var showSearch = this.isDescendant(document.getElementsByClassName('search-container')[0], event.target) && this.state.query !== '';
    this.setState({
      showSearch
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
        </div>
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
        {
          this.state.showDeviceData && !this.state.deviceLoaded && (
            <>
              { notLoaded }
            </>
          )
        }
        {
          this.state.showDeviceData && this.state.deviceLoaded && (
            <>
            <br />
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
      <Container className="home-container" onClick={this.toggleSearchIfIntended}>
        <Paper className="home-container-paper">
          { this.state.devicesLoaded ? onLoad : notLoaded }
        </Paper>
      </Container>
    );
  }
}

export default withTranslation()(Home);
