import React from "react";
import { Container, Paper, Typography, Grid, Button } from "@material-ui/core";
import './home.scss';
import Select from 'react-select';
import data from '../../data.json';

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
  render() {
    return (
      <Container className="home-container">
        <Paper>
          <Typography variant="h5">Download OpenWrt firmware for your device!</Typography>
          <Typography>Please use the input below to download firmware for your device!</Typography>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Select
                onChange={this.changeVendor}
                options={this.devices}
                value={this.state.vendor}
              />
            </Grid>
            {
              this.state.vendor === null ? '' : (
                <Grid item xs={4}>
                  <Select
                    onChange={this.changeModel}
                    options={this.state.vendor.value}
                    value={this.state.model}
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
            Submit
          </Button>
          <br />
          {this.state.showDeviceData ? (
            <table className="device-table">
              <tbody>
                <tr>
                  <td>Model</td>
                  <td>{this.state.device.model}</td>
                </tr>
                <tr>
                  <td>Vendor</td>
                  <td>{this.state.device.vendor}</td>
                </tr>
                { 
                  this.state.device.variant === null || this.state.device.variant === '' ? '' : (
                    <tr>
                      <td>Variant</td>
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

export default Home;
