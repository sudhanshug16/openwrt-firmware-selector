import React from "react";
import { Container, Paper, Typography, InputAdornment, FormControl, TextField, List, ListItem, ListItemText } from "@material-ui/core";
import { fade, makeStyles } from '@material-ui/core/styles';


import SearchIcon from '@material-ui/icons/Search';
import './home.scss';
import data from '../../data.json';
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
    searchResults: [],
    showSearch: false,
    selectedSearchIndex: 0,
    query: '',
  };
  fuzzySet;

  componentDidMount() {
    Object.keys(data['devices']).forEach((device_id) => {
      var deviceName = '';
      if ('vendor' in data['devices'][device_id]) {
        deviceName += data['devices'][device_id]['vendor'] + ' ';
      }
      deviceName += data['devices'][device_id]['model'];
      if ('variant' in data['devices'][device_id]) {
        if (data['devices'][device_id]['variant'] !== '') {
          deviceName += ' ' + data['devices'][device_id]['variant'];
        }
      }
      this.deviceNames.push(deviceName);
      this.deviceNamesID[deviceName] = device_id;
    });
    this.fuzzySet = FuzzySet(this.deviceNames);
  }

  selectDevice = (device_id) => {
    if (device_id != null) {
      this.setState({
        device: data["devices"][device_id],
        showDeviceData: true,
        showSearch: false,
        query: data["devices"][device_id]["vendor"] + " " + data["devices"][device_id]["model"] + " " + data["devices"][device_id]["variant"]
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
        searchResults.push(data['devices'][this.deviceNamesID[deviceNames[i][1]]]);
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

  render() {
    return (
      <Container className="home-container" onClick={this.toggleSearchIfIntended}>
        <Paper className="home-container-paper">
          <Typography variant="h5">
            {this.props.t('appIntro.head')}
          </Typography>
          <Typography>
            {this.props.t('appIntro.para')}
          </Typography>
          <br />
          <div className="search-container">
            <FormControl fullWidth>
              <SearchTextField
                id="outlined-adornment-search-devices"
                labeltext={this.props.t('components.search.label')}
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
                        key={res["device_id"]}
                        button
                        onClick={() => this.selectDevice(res["device_id"])}
                      >
                        <ListItemText primary={
                          <div>
                            {res["vendor"]} {res["model"]} {res["variant"]}
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
                  <ListItemText primary={this.props.t('components.search.noResults')}></ListItemText>
                </ListItem>
              </Paper>
            )
          }
          <br />
          {this.state.showDeviceData ? (
            <table className="device-table">
              <tbody>
                <tr>
                  <td>{this.props.t('table.model')}</td>
                  <td>{this.state.device.model}</td>
                </tr>
                <tr>
                  <td>{this.props.t('table.vendor')}</td>
                  <td>{this.state.device.vendor}</td>
                </tr>
                { 
                  this.state.device.variant === null || this.state.device.variant === '' ? '' : (
                    <tr>
                      <td>{this.props.t('table.variant')}</td>
                      <td>{this.state.device.variant}</td>
                    </tr>
                  )
                }
                {
                  this.state.device.images.map((image, i) => {
                    return <tr key={i}>
                      <td>{image.type}</td>
                      <td><a href={"http://downloads.openwrt.org/snapshots/targets/" + this.state.device.target + "/" + this.state.device.subtarget + "/" + image.name}>{image.name}</a></td>
                    </tr>;
                  })
                }
              </tbody>
            </table>
          ) : ''}
        </Paper>
      </Container>
    );
  }
}

export default withTranslation()(Home);
