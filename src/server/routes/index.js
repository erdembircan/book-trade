import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { getLoadableState } from 'loadable-components/server';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import CustomMui from '../../shared/muiTheme';
import reducer from '../../client/reducers';
import App from '../../../src/client/App';
import render from '../utils/render';

const router = express.Router();

router.get('/favicon.ico', (req, res) => {
  res.sendStatus(203);
});

router.get('*', async (req, res) => {
  const context = {};

  const store = createStore(reducer);

  const appWithRouter = (
    <CustomMui>
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    </CustomMui>
  );

  if (context.url) {
    res.redirect(context.url);
    return;
  }

  const preloadedState = store.getState();
  const loadableState = await getLoadableState(appWithRouter);

  const html = ReactDOMServer.renderToString(appWithRouter);

  res.send(render(html, loadableState, preloadedState));
});

export default router;
