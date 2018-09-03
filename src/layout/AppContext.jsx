import React, { Component } from 'react';

const AppContext = React.createContext();

class AppProvider extends Component {
  render() { 
    return ( 
      <AppContext.Provider value="hi">
        {this.props.children}
      </AppContext.Provider>
     );
  }
}
 
export default AppProvider;