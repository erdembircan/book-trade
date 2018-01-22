import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { getLoadableState } from 'loadable-components/server';
import CustomMui from '../../shared/muiTheme';
import App from '../../../src/client/App';
import render from './render';
import { writeStoreToSession } from './index';

import reducer from '../../client/reducers';

const renderToReact = async (req, preLoadedState = {}) => {
  const context = {};

  const store = createStore(reducer, preLoadedState);

  const app = (
    <CustomMui>
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    </CustomMui>
  );

  const state = store.getState();
  writeStoreToSession(req, preLoadedState);

  const loadable = await getLoadableState(app);

  const html = ReactDOMServer.renderToString(app);

  return render(html, loadable, state);
};

export default renderToReact;
