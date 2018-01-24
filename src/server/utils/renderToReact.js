import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { getLoadableState } from 'loadable-components/server';
import CustomMui from '../../shared/muiTheme';
import App from '../../../src/client/App';
import render from './render';
import { writeStoreToSession, flashRead, sanitizeSessionStore, flashWrite } from './index';

import reducer from '../../client/reducers';

const renderToReact = async (req, preLoadedState = {}) => {
  const context = {};

  const sessionStore = { ...flashRead(req, 'store'), ...preLoadedState };

  const store = createStore(reducer, sessionStore);

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

  const loadable = await getLoadableState(app);

  const html = ReactDOMServer.renderToString(app);

  const page = render(html, loadable, state);

  sanitizeSessionStore(req, { util: { notifications: { message: '' } } });

  return page;
};

export default renderToReact;
