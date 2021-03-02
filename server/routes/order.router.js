const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.delete('/delete/:id', (req, res) => {
    pool.query('DELETE FROM "orders" WHERE id=$1;', [req.params.id])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(`HEY MITCH - COULDN'T DELETE THE ORDER ${error}`);
            res.sendStatus(500);
        })
})

router.put('/update/:id', (req, res) => {
    const query = `UPDATE "orders" SET "name"=$1, "email"=$2 WHERE "id"=$3;`;
    pool.query(query, [req.body.name, req.body.email, req.params.id])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(`HEY MITCH - COULDN'T CHANGE THE NAME! ${error}`);
            res.sendStatus(500);
        })
})

router.put('/completed/:id', (req, res) => {
    let id = req.params.id;
    const query = `UPDATE "orders" SET "complete"='true' WHERE "id"=$1;`;
    pool.query(query, [id])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(`HEY MITCH - Couldn't make the update! - ${error}`);
            res.sendStatus(500);
        })
});

router.get('/', (req, res) => {
    let queryText = '';
    let query = req.query
    //if there is no query string, get them all. If there is a query string, send a sql query with that name in it. (stretch goal)
    if (Object.keys(query).length === 0) {
        //sends back a row with data from the orders table along with an array or URLs for the photos
        queryText = `
    SELECT "orders"."id", "orders"."complete", "orders"."order_date", "orders"."name", "orders"."email", "orders"."total", array_agg("url") 
    FROM "orders"
    JOIN "order_ids" ON "order_ids"."order_id"="orders"."id"
    JOIN "images" ON "order_ids"."image_id"="images"."id"
    GROUP BY "orders"."complete", "orders"."order_date", "orders"."name", "orders"."email", "orders"."total", "orders"."id"
    ORDER BY "complete" ASC;`
    }
    else {
        queryText = `
        SELECT "orders"."id", "orders"."complete", "orders"."order_date", "orders"."name", "orders"."email", "orders"."total", array_agg("url") 
        FROM "orders"
        JOIN "order_ids" ON "order_ids"."order_id"="orders"."id"
        JOIN "images" ON "order_ids"."image_id"="images"."id"
        WHERE "orders"."name" ILIKE '%${query.q}%'
        GROUP BY "orders"."complete", "orders"."order_date", "orders"."name", "orders"."email", "orders"."total", "orders"."id"
        ORDER BY "complete" ASC;`
    }
        pool.query(queryText).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(`HEY MITCH - COULDN"T GET THE ORDERS ${error}`);
            res.sendStatus(500);
        })
    });

router.post('/', (req, res) => {
    const newOrder = req.body;
    const ordersQuery = `INSERT INTO "orders" 
    ("name", "email", "total") 
    VALUES ($1, $2, $3)
    RETURNING "id";`;
    pool.query(ordersQuery, [newOrder.name, newOrder.email, newOrder.total])
        .then((result) => {
            const createdOrderId = result.rows[0].id;
            //second query, for the join table "order_ids"
            const images = req.body.images;
            for (let image of images) {
                const joinTableQuery =
                    `INSERT INTO "order_ids" ("order_id", "image_id") VALUES ($1, $2);`
                pool.query(joinTableQuery, [createdOrderId, image]).then(result => {
                }).catch(error => {
                    console.log(`HEY MITCH - GOT AN ERROR WITH ORDER_IDS TABLE ${error}`);
                    res.sendStatus(500);
                })
            }
        })
        .catch((error) => {
            console.log(`HEY MITCH - YOU GOT AN ERROR PLACING AN ORDER ${error}`);
            res.sendStatus(500);
        })
    res.sendStatus(201);
});

module.exports = router;

/* router.get('/', (req, res) => {
    let queryText = '';
    let query = req.query
    //if there is no query string, get them all. If there is a query string, send a sql query with that name in it. (stretch goal)
    if (Object.keys(query).length === 0) {
        queryText = 'SELECT * FROM "treats" ORDER BY "id" DESC;';
    }
    else {
        queryText = `SELECT * FROM "treats" WHERE "name" ILIKE '%${query.q}%'`
    }
    console.log(queryText);
    pool.query(queryText).then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting treats', error);
      res.sendStatus(500);
    });
  }); */

/*
function b(a){$.ajax({method:"GET",url:"/treats?q="+a}).done(function(b){console.log("GET /treats?q=",a,"returned ",b)
*/