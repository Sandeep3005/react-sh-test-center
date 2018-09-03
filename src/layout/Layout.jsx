import React, { Component } from 'react';
import Header from '../components/header/Header';
import { MuiThemeProvider } from '@material-ui/core/styles';
import AppRoutes from '../App.Routes';
import theme from './theme';


class Layout extends Component {
  state = {}
  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Header />
          <AppRoutes/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Layout;