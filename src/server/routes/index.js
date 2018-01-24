import express from 'express';
import renderToReact from '../utils/renderToReact';
import { writeStoreToSession } from '../utils';

const router = express.Router();

router.get('/logout', (req, res) => {
  writeStoreToSession(req, {
    user: undefined,
    util: { notifications: { message: 'logged out', open: true } },
  });
  res.redirect('/');
});

router.get('*', async (req, res) => {
  res.send(await renderToReact(req));
});

export default router;
