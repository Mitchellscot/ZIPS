const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const paginate = require('jw-paginate');

//deletes an image with a given id
router.delete('/delete/:id', (req, res) => {
    pool.query('DELETE FROM "orders" WHERE id=$1;', [req.params.id])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(`HEY MITCH - COULDN'T DELETE THE ORDER ${error}`);
            res.sendStatus(500);
        })
});
//edits either a name or an email with a given id
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
//mark an order as being complete
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
//gets orders based on a given date
router.get('/date', (req, res) =>{
    const page = parseInt(req.query.page) || 1;
    let date = req.query.q;
    let queryText = `SELECT "orders"."id", "orders"."complete", "orders"."order_date", "orders"."name", "orders"."email", "orders"."total", array_agg("url") 
    FROM "orders"
    JOIN "order_ids" ON "order_ids"."order_id"="orders"."id"
    JOIN "images" ON "order_ids"."image_id"="images"."id"
    WHERE CAST("orders"."order_date" as date) = date '${date}'
    GROUP BY "orders"."complete", "orders"."order_date", "orders"."name", "orders"."email", "orders"."total", "orders"."id"
    ORDER BY "complete" ASC;`;
    pool.query(queryText).then((result) => {
        const pager = paginate(result.rows.length, page, 8);
        const pageOfOrders = result.rows.slice(pager.startIndex, pager.endIndex + 1);
        res.send({pager, pageOfOrders, date});
    }).catch((error) => {
        console.log(`HEY MITCH - COULDN'T GET THE SEARCHED ORDERS ${error}`);
        res.sendStatus(500);
    })
})
//gets orders. If there is a query string, use it to search. If not, get them all
router.get('/', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    let queryText = '';
    let query = req.query.q;
    let date = req.query.date;
    console.log(`this is date ${date}`);
    //if there is no query string, get them all. If there is a query string, send a sql query with that name in it.
    if (query == undefined) {
        //sends back a row with data from the orders table along with an array or URLs for the photos
        queryText = `
        SELECT "orders"."id", "orders"."complete", "orders"."order_date", "orders"."name", "orders"."email", "orders"."total", array_agg("url") 
        FROM "orders"
        JOIN "order_ids" ON "order_ids"."order_id"="orders"."id"
        JOIN "images" ON "order_ids"."image_id"="images"."id"
        GROUP BY "orders"."complete", "orders"."order_date", "orders"."name", "orders"."email", "orders"."total", "orders"."id"
        ORDER BY "complete" ASC, "orders"."order_date" DESC;`
    }
    else {
        //searches by name or email
        queryText = `
        SELECT "orders"."id", "orders"."complete", "orders"."order_date", "orders"."name", "orders"."email", "orders"."total", array_agg("url") 
        FROM "orders"
        JOIN "order_ids" ON "order_ids"."order_id"="orders"."id"
        JOIN "images" ON "order_ids"."image_id"="images"."id"
        WHERE "orders"."name" ILIKE '%${query}%' 
        OR "orders"."email" ILIKE '%${query}%'
        AND CAST("orders"."order_date" as date) = date '${date}' 
        GROUP BY "orders"."complete", "orders"."order_date", "orders"."name", "orders"."email", "orders"."total", "orders"."id"
        ORDER BY "complete" ASC;`
    }
    pool.query(queryText).then((result) => {
        const pager = paginate(result.rows.length, page, 8);
        const pageOfOrders = result.rows.slice(pager.startIndex, pager.endIndex + 1);
        res.send({pager, pageOfOrders, date});
    }).catch((error) => {
        console.log(`HEY MITCH - COULDN'T GET THE ORDERS ${error}`);
        res.sendStatus(500);
    });
});
//creates an order. After dat is submitted to orders table, associate the images with the order.
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
});
module.exports = router;