import express from 'express';
import renderToReact from '../utils/renderToReact';
import { writeStoreToSession } from '../utils';

const router = express.Router();

router.get('/logout', (req, res) => {
  writeStoreToSession(req, { user: undefined });
  res.redirect('/');
});

router.get('*', async (req, res) => {
  res.send(await renderToReact(req));
});

export default router;
