import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as Routes from './routes';

const App = props => (
  <Switch>
    <Route exact path="/" component={Routes.HomePage} />
    <Route path="/contact" component={Routes.Contact} />
  </Switch>
);

export default App;
