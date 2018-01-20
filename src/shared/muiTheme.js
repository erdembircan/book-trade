import React from 'react';
import { getMuiTheme, MuiThemeProvider, lightBaseTheme, darkBaseTheme } from 'material-ui/styles';

const CustomMuiComponent = (props) => {
  const muiTheme = getMuiTheme();
  // muiTheme.userAgent = props.userAgent || navigator.userAgent;

  return <MuiThemeProvider muiTheme={muiTheme}>{props.children}</MuiThemeProvider>;
};

export default CustomMuiComponent;
