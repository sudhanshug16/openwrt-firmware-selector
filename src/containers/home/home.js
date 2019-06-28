import React from "react";
import { Container, Paper, Typography, Grid, Button } from "@material-ui/core";
import './home.scss';
import Select from 'react-select';
import data from '../../data.json';
import { withTranslation } from 'react-i18next';

class Home extends React.Component {

  devices = [];
  state = {
    selectedOption: null,
    variants: [],
    models: [],
    showDeviceData: false,
    device: null,
    vendor: null,
    model: null,
    variant: null
  };

  vendorExistsInDevices(vendor) {
    var exists = false;
    var existIndex = -1;
    this.devices.forEach((d, i) => {
      if (d["label"] === vendor) {
        exists = true;
        existIndex = i;
      }
    });
    return {
      exists,
      existIndex
    };
  }
  
  modelExistsInDevices(vendorIndex, model) {
    var exists = false;
    var existIndex = -1;
    this.devices[vendorIndex]["value"].forEach((d, i) => {
      if (d["label"] === model) {
        exists = true;
        existIndex = i;
      }
    });
    return {
      exists,
      existIndex
    };
  }
  
  variantExistsInDevices(vendorIndex, modelIndex, variant) {
    var exists = false;
    var existIndex = -1;
    this.devices[vendorIndex]["value"][modelIndex]["value"].forEach((d, i) => {
      if (d["label"] === variant) {
        exists = true;
        existIndex = i;
      }
    });
    return {
      exists,
      existIndex
    };
  }

  componentDidMount() {
    Object.keys(data["devices"]).forEach((device_id) => {
      var vendor = "";
      var variant = "";
      var device_data = data["devices"][device_id];
      if ("vendor" in device_data) {
        vendor = device_data["vendor"];
      }
      var model = device_data["model"];
      if ("variant" in device_data) {
        variant = device_data["variant"];
      }
      var vendorExists = this.vendorExistsInDevices(vendor);
      if (vendorExists.exists) {
        var modelExists = this.modelExistsInDevices(vendorExists.existIndex, model);
        if (modelExists.exists) {
          var variantExists = this.variantExistsInDevices(vendorExists.existIndex, modelExists.existIndex, variant);
          if (!variantExists.existIndex) {
            this.devices[vendorExists.existIndex]["value"][modelExists.existIndex]["value"].push({
              "label": variant,
              "value": device_data
            });
          }
        } else {
          this.devices[vendorExists.existIndex]["value"].push({
            "label": model,
            "value": [{
              "label": variant,
              "value": device_data
            }]
          });
        }
      } else {
        this.devices.push({
          "label": vendor,
          "value": [{
            "label": model,
            "value": [{
              "label": variant,
              "value": device_data
            }]
          }]
        });
      }
    });
  }
  
  changeVendor = (v) => {
    this.setState({
      vendor: v,
      model: null,
      variant: null,
    });
  }
  
  changeModel = (v) => {
    this.setState({
      model: v,
      variant: v.value[0],
    });
  }
  
  changeVariant = (v) => {
    this.setState({
      variant: v,
    });
  }

  findDevice = () => {
    try {
      var device = this.state.variant.value;
      this.setState({
        device: device,
        showDeviceData: true,
      });
    } catch (error) {
      this.setState({
        device: {},
        showDeviceData: false,
      });
    }
  }

  noOptionsMessage = (props) => <Typography {...props.innerProps}>{this.props.t('components.select.noOptions')}</Typography>;

  render() {
    return (
      <Container className="home-container">
        <Paper>
          <Typography variant="h5">
            {this.props.t('appIntro.head')}
          </Typography>
          <Typography>
            {this.props.t('appIntro.para')}
          </Typography>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Select
                onChange={this.changeVendor}
                options={this.devices}
                value={this.state.vendor}
                placeholder={this.props.t('components.select.placeholder')}
                noOptionsMessage={this.noOptionsMessage}
              />
            </Grid>
            {
              this.state.vendor === null ? '' : (
                <Grid item xs={4}>
                  <Select
                    onChange={this.changeModel}
                    options={this.state.vendor.value}
                    value={this.state.model}
                    placeholder={this.props.t('components.select.placeholder')}
                    noOptionsMessage={this.noOptionsMessage}
                  />
                </Grid>
              )
            }
            {
              this.state.model === null ? '' : (
                (this.state.model.value.length === 1 && this.state.model.value[0].label === '') ? '' : (
                  <Grid item xs={4}>
                    <Select
                      onChange={this.changeVariant}
                      options={this.state.model.value}
                      value={this.state.variant}
                      placeholder={this.props.t('components.select.placeholder')}
                      noOptionsMessage={this.noOptionsMessage}
                    />
                  </Grid>
                )
              )
            }
          </Grid>
          <br />
          <Button 
            color="primary" 
            variant="contained"
            onClick={this.findDevice.bind(this)}
          >
            {this.props.t('components.submit')}
          </Button>
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
