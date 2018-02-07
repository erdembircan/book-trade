import { parseString } from 'xml2js';
import axios from 'axios';
import express from 'express';
import validator from 'validator';
import envData from 'env-data';
import validateStrings from '../utils/stringValidate';
import { checkLength, writeStoreToSession, flashWrite, hashString } from '../utils/index';
import { sign, verify } from '../utils/jwtUtils';
import authCheck from '../middleware/authCheck';
import getReqAdress from '../utils/grReqFormat';
import sData from '../sData';
import ServerSocket from '../serverSocket';

require('../models/user');
require('../models/requests');

const User = require('mongoose').model('User');
const Requests = require('mongoose').model('Requests');

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
          token: sign(user._id, envData.getData('jwtSecret')),
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

  const hashedPassword = hashString(req.body.password);

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
    User.findOne({ name, password: hashedPassword })
      .then((user) => {
        if (user) {
          const token = sign(user._id, envData.getData('jwtSecret'));

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
  '/getbook',
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

            temp.id = item.id[0]._;
            temp.title = item.best_book[0].title[0];
            temp.author = item.best_book[0].author[0].name[0];
            temp.year = item.original_publication_year[0]._;
            temp.image = item.best_book[0].small_image_url[0];

            return temp;
          });

          // return res.send(jsonRespMap);
          return res.send(jsonResp.slice(0, results));
        }
        return res.send();
      });
    });
  },
);

router.get('/userbooks', authCheck(), (req, res) => {
  verify(req.cookies['auth.loc'], envData.getData('jwtSecret'))
    .then((data) => {
      User.findOne({ _id: data }, { books: [], _id: 0 })
        .then((books) => {
          res.send(books);
        })
        .catch((err) => {
          res.send({ error: err });
        });
    })
    .catch((err) => {
      res.send({ error: err });
    });
});

router.post('/addbook', authCheck(), (req, res) => {
  const book = JSON.parse(req.body.book);

  verify(req.cookies['auth.loc'], envData.getData('jwtSecret'))
    .then((data) => {
      User.findOne({ _id: data }).then((user) => {
        user.books.push(book);
        user
          .save()
          .then((saved) => {
            res.send({ status: 200 });
          })
          .catch(err => res.send({ error: err }));
      });
    })
    .catch(err => res.send({ error: err }));
});

router.get('/bookpool', (req, res) => {
  User.find({}, { books: 1, _id: 0 }).then((resp) => {
    const bookPool = [];

    resp.map(item =>
      item.books.map((book) => {
        bookPool.push(book);
      }));

    const reduced = [];

    bookPool.reduce((a, b) => {
      const index = a.map(item => item.id).indexOf(b.id);

      if (index >= 0) {
        a[index].count++;
      } else {
        a.push({ ...b, ...{ count: 1 } });
      }

      return a;
    }, reduced);

    res.send(reduced);
  });
});

router.post('/makerequest', authCheck(), async (req, res) => {
  const { bookid, booktitle } = req.body;
  if (!bookid || !booktitle) {
    return res.send({ error: 'invalid request' });
  }

  try {
    const authCookie = req.cookies['auth.loc'];

    const userId = await verify(authCookie, envData.getData('jwtSecret'));

    if (userId) {
      const reqUser = await User.findOne({ _id: userId });

      const owner = await User.findOne({ books: { $elemMatch: { id: bookid } } });

      const request = new Requests({
        owner: owner.name,
        requester: reqUser.name,
        bookId: bookid,
        bookTitle: booktitle,
        status: 'waiting',
      });

      const sReq = await request.save();

      ServerSocket.broadcast(
        { status: 200, data: { type: 'incrementUncheckedCount' } },
        owner.name,
      );

      ServerSocket.broadcast(
        { status: 200, data: { type: 'sendNotification', args: ['you got a trade request'] } },
        owner.name,
      );

      res.send({ response: sReq });
    }
  } catch (err) {
    console.log(err);
    res.send({ error: 'an error occured' });
  }
});

router.get('/trades', authCheck(), async (req, res) => {
  const type = req.query.type || 'in';

  try {
    const id = await verify(req.cookies['auth.loc'], envData.getData('jwtSecret'));

    const user = await User.findOne({ _id: id });

    if (type === 'in') {
      const tradesIn = await Requests.find({ owner: user.name });
      let unChecked = tradesIn.length - user.checkedTrades.length;
      if (unChecked < 0) unChecked = 0;
      if (unChecked > 0) {
        const after = Array.from(new Set([...user.checkedTrades, ...tradesIn.map(trade => trade._id.toString())]));
        user.checkedTrades = after;

        await user.save();
      }

      return res.send({ response: tradesIn, unchecked: unChecked });
    } else if (type === 'out') {
      const tradesOut = await Requests.find({ requester: user.name });

      return res.send({ response: tradesOut });
    }
  } catch (err) {
    res.send({ error: 'an error occured' });
  }

  res.send({ error: 'invalid request' });
});

export default router;
