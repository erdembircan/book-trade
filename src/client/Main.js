import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const Main = props => (
  <Router>
    <App {...props} />
  </Router>
);

export default Main;
