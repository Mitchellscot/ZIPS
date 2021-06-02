const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  const query=`SELECT * FROM "costs";`
  pool.query(query).then((result) => {
    const price = result.rows[0].cost;
    const tax = result.rows[0].tax;
    res.send({price, tax});
}).catch((error) => {
    console.log(`HEY MITCH - COULDN'T GET THE COSTS ${error}`);
    res.sendStatus(500);
})
});

router.put('/updateCost', (req, res) => {
  const query=`UPDATE "costs" SET "cost"=$1 WHERE "id"=$2;`;
  pool.query(query, [req.body.cost, 1])
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`HEY MITCH - COULDN'T CHANGE THE PRICE! ${error}`);
        res.sendStatus(500);
    }) 
});

router.put('/updateTax', (req, res) => {
  const query=`UPDATE "costs" SET "tax"=$1 WHERE "id"=$2;`;
  pool.query(query, [req.body.tax, 1])
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`HEY MITCH - COULDN'T CHANGE THE PRICE! ${error}`);
        res.sendStatus(500);
    }) 
});

module.exports = router;
