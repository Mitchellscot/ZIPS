const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  const query=`SELECT * FROM "costs";`
  pool.query(query).then((result) => {
    res.send(result.rows);
}).catch((error) => {
    console.log(`HEY MITCH - COULDN'T GET THE COSTS ${error}`);
    res.sendStatus(500);
})
});


router.put('/', (req, res) => {
  const query=`UPDATE "costs" SET "cost"=$1, "tax"=$2 WHERE "id"=$3;`;
  pool.query(query, [req.body.costs, req.body.tax, 1])
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`HEY MITCH - COULDN'T CHANGE THE PRICE! ${error}`);
        res.sendStatus(500);
    }) 
});

module.exports = router;
