import React from 'react';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import theme from './customTheme';

const CustomMuiComponent = (props) => {
  const muiTheme = getMuiTheme(theme);
  // muiTheme.userAgent = props.userAgent || navigator.userAgent;

  return <MuiThemeProvider muiTheme={muiTheme}>{props.children}</MuiThemeProvider>;
};

export default CustomMuiComponent;
