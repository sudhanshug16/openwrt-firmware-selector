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
      main: '#00a3e1',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#212322',
    },
  },
  typography: {
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    fontFamily: [
      'Open Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      ,
    ].join(','),
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
              <Route component={NotFound} />
            </Switch>
          </Router>
          <Footer />
        </div>
      </React.Suspense>
    </ThemeProvider>
  );
};

export default App;
