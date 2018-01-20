import React from 'react';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import theme from './customTheme';

const CustomMuiComponent = (props) => {
  const muiTheme = getMuiTheme(theme);

  return <MuiThemeProvider muiTheme={muiTheme}>{props.children}</MuiThemeProvider>;
};

export default CustomMuiComponent;
