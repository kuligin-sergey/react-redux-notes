import React, { Component } from 'react';
import './App.scss';
import store from "./store";
import { Provider } from "react-redux";
import Notes from './containers/Notes';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#508ab4' }, 
    secondary: { main: '#fff' }, 
  },
  typography: { useNextVariants: true },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Notes/>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
