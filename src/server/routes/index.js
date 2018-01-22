import express from 'express';
import renderToReact from '../utils/renderToReact';

const router = express.Router();

router.get('*', async (req, res) => {
  res.send(await renderToReact(req));
});

export default router;
