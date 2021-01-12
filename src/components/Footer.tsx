import { Paper, Toolbar } from '@material-ui/core';
import React, { FunctionComponent } from 'react';

const Footer: FunctionComponent = () => {
  return (
    <>
      <Toolbar hidden />
      <Paper elevation={4} className="report-problem-container">
        <span>
          If you come across any issue, feel free to report{' '}
          <a href="https://github.com/aparcar/attendedsysupgrade-server/issues">here</a>.
        </span>
        <span className="report-link">
          For contributions, go to{' '}
          <a href="https://github.com/sudhanshu16/openwrt-firmware-selector/">Github</a>
        </span>
      </Paper>
    </>
  );
};

export default Footer;
