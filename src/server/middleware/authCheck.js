import envData from 'env-data';
import { flashWrite, writeStoreToSession } from '../utils';
import { verify } from '../utils/jwtUtils';

require('../models/user');
const User = require('mongoose').model('User');

const writeMessageAndRedirect = (req, res, url, message) => {
  flashWrite(req, 'message', message);
  res.redirect(url);
};

const authCheck = (params = { redirectUrl: '/', message: 'you need to be logged in' }) => (
  req,
  res,
  next,
) => {
  const authCookie = req.cookies['auth.loc'];

  if (!authCookie) {
    return writeMessageAndRedirect(req, res, params.redirectUrl, params.message);
  }
  verify(authCookie, envData.getData('jwtSecret'))
    .then((data) => {
      if (data) {
        User.findOne({ _id: data }).then((user) => {
          if (user) {
            return next();
          }
          writeStoreToSession(req, {
            user: undefined,
          });
          return writeMessageAndRedirect(req, res, params.redirectUrl, params.message);
        });
      } else {
        writeStoreToSession(req, {
          user: undefined,
        });
        return writeMessageAndRedirect(req, res, params.redirectUrl, params.message);
      }
    })
    .catch((err) => {
      writeStoreToSession(req, {
        user: undefined,
      });

      return writeMessageAndRedirect(req, res, params.redirectUrl, params.message);
    });
};

export default authCheck;
