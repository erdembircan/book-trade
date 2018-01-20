import React from 'react';
import ReactDom from 'react-dom';
import { loadComponents } from 'loadable-components';
import Main from './Main';
import css from './css/main.sass';

loadComponents().then(() => {
  ReactDom.hydrate(<Main />, document.getElementById('root'));
});
