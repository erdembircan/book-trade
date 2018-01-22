import express from 'express';
import validator from 'validator';
import validateStrings from '../utils/stringValidate';
import { checkLength } from '../utils/index';

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
        if (err.code === 11000) return res.send({ errors: { name: 'username already exists' } });

        res.send({ errors: { global: err } });
      }

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

export default router;
