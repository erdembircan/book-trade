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

  setTimeout(() => {
    if (Object.keys(errors).length > 0) {
      res.send({
        errors,
      });
    } else {
      res.send({
        response: {
          message: 'done',
        },
      });
    }
  }, 5000);
});

export default router;
