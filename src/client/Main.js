import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import CustomMui from '../shared/muiTheme';
import store from './store';
import App from './App';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CustomMui>
        <Provider store={store()}>
          <Router>
            <App {...this.props} />
          </Router>
        </Provider>
      </CustomMui>
    );
  }
}

export default Main;
