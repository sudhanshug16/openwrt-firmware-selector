import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.scss';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Header from './components/header.js'
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header></Header>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route default component={NotFound}></Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
