import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Paper, Toolbar } from '@material-ui/core';
import Header from './components/Header';
import Home from './containers/home/home';
import NotFound from './containers/not-found/not-found';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3F51B5',
    },
    secondary: {
      main: '#009688',
    },
  },
});

const App: FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<LinearProgress />}>
        <div className="App">
          <Header />
          <Router>
            <Switch>
              <Route path="" component={Home} />
              <Route default component={NotFound} />
            </Switch>
          </Router>
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
        </div>
      </React.Suspense>
    </ThemeProvider>
  );
};

export default App;
