import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppBar } from 'material-ui';
import * as Routes from './routes';

const App = props => (
  <div>
    <AppBar title="Book Club" />
    <Switch>
      <Route exact path="/" component={Routes.HomePage} />
      <Route path="/contact" component={Routes.Contact} />
      <Route path="/counter" component={Routes.Counter} />
    </Switch>
  </div>
);

export default App;
