import React, {Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.scss';

import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import Header from './components/header.js';
import Home from './containers/home/home';
import NotFound from './containers/not-found/not-found';
import LinearProgress from '@material-ui/core/LinearProgress';

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

function App() {
  return (
      <ThemeProvider theme={theme}>
        <Suspense fallback={
          <LinearProgress/>
        }>
          <div className="App">
            <Header/>
            <Router>
              <Switch>
                <Route path="" component={Home}/>
                <Route default component={NotFound}/>
              </Switch>
            </Router>
          </div>
        </Suspense>
      </ThemeProvider>
  );
}

export default App;
