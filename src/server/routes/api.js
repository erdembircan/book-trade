import { parseString } from 'xml2js';
import axios from 'axios';
import express from 'express';
import validator from 'validator';
import envData from 'env-data';
import validateStrings from '../utils/stringValidate';
import { checkLength, writeStoreToSession, flashWrite } from '../utils/index';
import { sign } from '../utils/jwtUtils';
import authCheck from '../middleware/authCheck';
import getReqAdress from '../utils/grReqFormat';
import sData from '../sData';

require('../models/user');

const User = require('mongoose').model('User');

const router = new express.Router();

router.post('/addUser', (req, res) => {
  Object.keys(req.body).map((key) => {
    req.body[key] = req.body[key].trim();
  });

  const { name, password } = req.body;

  const errors = validateStrings([
    {
      name: 'name',
      value: name,
      rules: [
        { checker: validator.isAlphanumeric, errorMessage: 'only letters and numbers are allowed' },
        { checker: validator.isLowercase, errorMessage: 'only lowercase letters are allowed' },
        { checker: checkLength(5, 10), errorMessage: 'should be between 5-10 characters' },
      ],
    },
    {
      name: 'password',
      value: password,
      rules: [
        { checker: validator.isAlphanumeric, errorMessage: 'only letters and numbers are allowed' },
        { checker: checkLength(5, 10), errorMessage: 'should be between 5-10 characters' },
      ],
    },
  ]);

  if (Object.keys(errors).length > 0) {
    res.send({
      errors,
    });
  } else {
    const newUser = new User({
      name,
      password,
    });

    newUser.save((err, user) => {
      if (err) {
        if (err.code === 11000) {
          return res.send({ errors: { name: 'username already exists' } });
        }

        res.send({ errors: { global: err } });
      }

      writeStoreToSession(req, { user: { name: user.name } });

      res.send({
        response: {
          user: {
            name: user.name,
          },
        },
      });
    });
  }
});

router.post('/logUser', (req, res) => {
  Object.keys(req.body).map((key) => {
    req.body[key] = req.body[key].trim();
  });

  const { name, password } = req.body;

  const errors = validateStrings([
    {
      name: 'name',
      value: name,
      rules: [
        { checker: validator.isAlphanumeric, errorMessage: 'only letters and numbers are allowed' },
        { checker: validator.isLowercase, errorMessage: 'only lowercase letters are allowed' },
        { checker: checkLength(5, 10), errorMessage: 'should be between 5-10 characters' },
      ],
    },
    {
      name: 'password',
      value: password,
      rules: [
        { checker: validator.isAlphanumeric, errorMessage: 'only letters and numbers are allowed' },
        { checker: checkLength(5, 10), errorMessage: 'should be between 5-10 characters' },
      ],
    },
  ]);

  if (Object.keys(errors).length > 0) {
    res.send({
      errors,
    });
  } else {
    User.findOne({ name, password })
      .then((user) => {
        if (user) {
          const token = sign(user._id, envData.getData('jwtSecret'));

          flashWrite(req, 'message', 'logged in');

          writeStoreToSession(req, { user: { name: user.name } });
          return res.send({ response: { user: { name: user.name }, token } });
        }
        return res.send({
          errors: { password: 'invalid username/password' },
        });
      })
      .catch(err => res.send({ errors: { global: 'server error' } }));
  }
});

router.get(
  '/getBook',
  authCheck({ redirectUrl: '/', message: 'you need to be logged in' }),
  (req, res) => {
    const { bookName } = req.query;
    const results = req.query.results || 5;
    if (!bookName) {
      return res.send(null);
    }

    const grAdress = getReqAdress({ q: bookName, key: sData.goodReadsAPIKey });

    axios({
      method: 'get',
      url: grAdress,
    }).then(({ data }) => {
      const cleanedString = data.replace('\ufeff', '');
      parseString(cleanedString, (err, result) => {
        const jsonRespMap = JSON.parse(JSON.stringify(result)).GoodreadsResponse.search[0]
          .results[0].work;
        if (jsonRespMap) {
          const jsonResp = jsonRespMap.map((item) => {
            const temp = {};

            temp.title = item.best_book[0].title[0];
            temp.author = item.best_book[0].author[0].name[0];
            temp.image = item.best_book[0].small_image_url[0];

            return temp;
          });

          return res.send(jsonResp.slice(0, results));
        }
        return res.send();
      });
    });
  },
);

export default router;
