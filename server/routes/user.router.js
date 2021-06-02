const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  res.send(req.user);
});

//don't need this anymore
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

router.post('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200);
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
  const userId = req.params.id;
  const newPassword = encryptLib.encryptPassword(req.body.password);
  try {
    const query = `UPDATE "user" SET "password"=$1 WHERE "id"=$2;`;
    pool.query(query, [newPassword, userId]).then(res.sendStatus(200));
  }
  catch(e) {
    console.log(`HEY MITCH - COULDN'T SET NEW PASSWORD ON SERVER ${e}`);
    res.sendStatus(500);
  }
})

module.exports = router;
