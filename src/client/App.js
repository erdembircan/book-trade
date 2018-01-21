import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as Routes from './routes';
import NavBar from './components/NavBar';
import Body from './components/Body';

const App = props => (
  <div>
    <NavBar />
    <Body>
      <Switch>
        <Route exact path="/" component={Routes.HomePage} />
        <Route path="/contact" component={Routes.Contact} />
        <Route path="/signup" component={Routes.SignUp} />
        <Route path="/login" component={Routes.LogIn} />
      </Switch>
    </Body>
  </div>
);

export default App;
