import express from 'express';
import validator from 'validator';
import envData from 'env-data';
import validateStrings from '../utils/stringValidate';
import { checkLength, writeStoreToSession, flashWrite } from '../utils/index';
import { sign } from '../utils/jwtUtils';

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

export default router;
