import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { getLoadableState } from 'loadable-components/server';
import CustomMui from '../../shared/muiTheme';
import App from '../../../src/client/App';
import render from './render';
import {
  writeStoreToSession,
  flashRead,
  sanitizeSessionStore,
  flashWrite,
  writeToWindowGlobal,
} from './index';

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
  writeStoreToSession(req, state);

  const loadable = await getLoadableState(app);

  const html = ReactDOMServer.renderToString(app);

  const windowGlobals = writeToWindowGlobal({
    preloaded_state: state,
    server_message: {
      message: flashRead(req, 'message') || (req.cookies.m ? req.cookies.m.message : ''),
    },
  });

  const page = render(html, loadable, windowGlobals);

  return page;
};

export default renderToReact;
