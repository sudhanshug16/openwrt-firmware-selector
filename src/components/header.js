import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LanguageIcon from '@material-ui/icons/Language';
import { Toolbar } from '@material-ui/core';

class Header extends React.Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography edge="start" variant="h6">OpenWrt Firmware Selector Wizard</Typography>
          <div style={{flexGrow: 1}}></div>
          <Button color="secondary"  variant="contained">
            Change Language &nbsp;
            <LanguageIcon />
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
