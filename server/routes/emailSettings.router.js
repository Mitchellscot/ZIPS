const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const query = `SELECT * FROM "email_settings";`
    pool.query(query).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(`HEY MITCH - COULDN'T GET THE EMAIL SETTINGS ${error}`);
        res.sendStatus(500);
    })
});

router.put('/', (req, res) => {
  // POST route code here
});

module.exports = router;