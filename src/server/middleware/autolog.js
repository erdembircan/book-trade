import envData from 'env-data';
import { verify } from '../utils/jwtUtils';
import { writeStoreToSession, flashWrite } from '../utils';

const User = require('mongoose').model('User');

const autolog = (req, res, next) => {
  const authCookie = req.cookies['auth.loc'];

  if (authCookie) {
    verify(authCookie, envData.getData('jwtSecret')).then((data) => {
      User.findOne({ _id: data })
        .then((user) => {
          if (user) {
            writeStoreToSession(req, { user: { name: user.name } });
            next();
          } else {
            flashWrite(req, message, 'an error occured');
            next();
          }
        })
        .catch((err) => {
          flashWrite(req, message, 'an error occured');
          next();
        });
    });
  } else next();
};

export default autolog;
