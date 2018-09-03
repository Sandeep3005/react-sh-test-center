import React, { Component } from 'react';
import { 
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton } from '@material-ui/core';

import './Header.css';
import theme from './../../layout/theme';



class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  getStyles = () => {
    return {
      colorPrimary: {
        background: "red",
      }
    }
  }

  render() { 
    const styles = this.getStyles();
    return ( 
      <div className="header-wrapper">
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit" className="header-title">
              SH Test Center
            </Typography>
            <Button color="secondary">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
     );
  }
}
 
export default Header;