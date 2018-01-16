import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import {getLoadableState} from 'loadable-components/server';
import App from '../../../src/client/App';
import render from '../utils/render';

const router = express.Router();

// router.get('/', (req, res) => {
//   res.send('hello from the server...');
// });

router.get('*', async (req, res) => {
  const context = {};

  const appWithRouter = (
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const loadableState = await getLoadableState(appWithRouter);
  const html = ReactDOMServer.renderToString(appWithRouter);

  res.send(render(html,loadableState));
});

export default router;
