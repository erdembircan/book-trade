import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';

const App = (props) => {
  <Switch>
    <Route exact path="/" component={HomePage} />
  </Switch>;
};

export default App;
