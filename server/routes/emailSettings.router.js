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

router.put('/update', (req, res) => {
    const query = `UPDATE "email_settings" SET 
    "source_email"=$1, 
    "reply_to_email"=$2, 
    "subject"=$3,
    "header"=$4,
    "body"=$5,
    "business_name"=$6,
    "business_email"=$7,
    "business_website"=$8,
    "business_phone"=$9
    WHERE "id"=$10;`;
    pool.query(query, [req.body.source_email,
        req.body.reply_to_email,
        req.body.subject,
        req.body.header,
        req.body.body,
        req.body.business_name,
        req.body.business_email,
        req.body.business_website,
        req.body.business_phone, 1])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(`HEY MITCH - COULDN'T CHANGE THE EMAIL SETTINGS! ${error}`);
            res.sendStatus(500);
        }) 
});

module.exports = router;