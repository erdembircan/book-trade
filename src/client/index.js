import React from 'react';
import ReactDom from 'react-dom';
import { loadComponents } from 'loadable-components';
import Main from './Main';

loadComponents().then(() => {
  ReactDom.render(<Main />, document.getElementById('root'));
});
