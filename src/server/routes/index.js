import express from 'express';
import envData from 'env-data';
import renderToReact from '../utils/renderToReact';
import { writeStoreToSession, flashWrite } from '../utils';
import { verify } from '../utils/jwtUtils';

require('../models/user');

const router = express.Router();

router.get('/logout', (req, res) => {
  writeStoreToSession(req, {
    user: undefined,
  });

  flashWrite(req, 'message', 'logged out');
  res.clearCookie('auth.loc');
  res.redirect('/');
});

router.get('/status', (req, res) => {
  verify(req.cookies['auth.loc'], envData.getData('jwtSecret'))
    .then((data) => {
      console.log(`verified: ${data}`);
      res.redirect('/');
    })
    .catch(err => res.redirect('/'));
});


router.get('*', async (req, res) => {
  res.send(await renderToReact(req));
});

export default router;
