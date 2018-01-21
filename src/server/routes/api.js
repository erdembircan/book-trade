import express from 'express';

require('../models/user');

const User = require('mongoose').model('User');

const router = new express.Router();

router.post('/addUser', (req, res) => {
  console.log('addUser');

  const newUser = new User({
    name: 'admin',
    password: 123456789,
  });

  newUser
    .save()
    .then((resp) => {
      console.log(resp);
      res.redirect('/');
    })
    .catch((err) => {
      res.redirect('/');
    });
});

export default router;
