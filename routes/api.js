const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const SECRET_KEY = 'SecretKey';

const CONNECTION = 'mongodb://127.0.0.1:27017/angular-auth-demo';
mongoose.connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Database Connected!');
}).catch(() => {
  console.error('Error during database connection!');
});

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request!');
  } else {
    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
      return res.status(401).send('Unauthorized request!');
    } else {
      const payload = jwt.verify(token, SECRET_KEY);
      if (!payload) {
        return res.status(401).send('Unauthorized request!');
      } else {
        req.id = payload.subject;
        next();
      }
    }
  }
}

router.post('/register', (req, res) => {
  const data = req.body;
  console.log(data);
  const user = new User(data);
  user.save((error, result) => {
    if (error) {
      console.error(error);
    } else {
      // By convention the key is "subject":
      const payload = { subject: user._id };
      const token = jwt.sign(payload, SECRET_KEY);
      res.status(200).send({ token });
    }
  });
});

router.post('/login', (req, res) => {
  const data = req.body;

  User.findOne({ email: data.email }, (error, user) => {
    if (error) {
      console.error(error)
    } else {
      if (user) {
        if (user.password === data.password) {
          const payload = { subject: user._id };
          const token = jwt.sign(payload, SECRET_KEY);
          res.status(200).send({ token });
        } else {
          res.status(401).send('Invalid Email Or Password!');
        }
      } else {
        res.status(401).send('Invalid Email Or Password!');
      }
    }
  });
});

router.get('/events', (req, res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ];

  res.json(events);
});

router.get('/special-events', verifyToken, (req, res) => {
    let events = [
      {
        "_id": "1",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ];
  
    res.json(events);
  });

module.exports = router;
