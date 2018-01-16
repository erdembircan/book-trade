import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store()}>
        <Router>
          <App {...this.props} />
        </Router>
      </Provider>
    );
  }
}

export default Main;
