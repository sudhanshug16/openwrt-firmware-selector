import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Header from './components/Header';
import Home from './containers/home/home';
import NotFound from './containers/not-found/not-found';
import Footer from './components/Footer';

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
              <Route path="" exact component={Home} />
              <Route default component={NotFound} />
            </Switch>
          </Router>
          <Footer />
        </div>
      </React.Suspense>
    </ThemeProvider>
  );
};

export default App;
