const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



//sets show=true for a given image. Default is false.
router.put('/show/:id', (req, res) => {
  console.log(req.body.show);
  console.log(req.params.id);
  const query = `UPDATE "images" SET "show"=$1 WHERE "id"=$2;`;
  pool.query(query, [req.body.show, req.params.id])
      .then((result) => {
          res.sendStatus(200);
      }).catch((error) => {
          console.log(`HEY MITCH - COULDN'T SET THE PICTURE TO SHOW! ${error}`);
          res.sendStatus(500);
      })
})

//deletes an image with a given id
router.delete('/delete/:id', (req, res) => {
  pool.query('DELETE FROM "images" WHERE id=$1;', [req.params.id])
      .then((result) => {
          res.sendStatus(200);
      }).catch((error) => {
          console.log(`HEY MITCH - COULDN'T DELETE THE IMAGE ${error}`);
          res.sendStatus(500);
      })
});

//gets all images that have show=true
router.get('/shown', (req, res)=>{
  let queryText = `SELECT * FROM "images" WHERE "show"=true;`;
  pool.query(queryText)
  .then((result) => {res.send(result.rows);})
  .catch((error)=>{
    console.log('HEY MITCH - COULDN\'T GET THE IMAGES MARKED AS SHOWN', error); 
    res.sendStatus(500);});
})

//selects all images that were created on a given date
router.get('/date', (req, res)=>{
  let query = req.query;
  const queryText = `SELECT * FROM "images" WHERE CAST("created" as date) = date '${query.q}' 
  ORDER BY "created" ASC;`
  pool.query(queryText)
  .then((result) => {res.send(result.rows);})
  .catch((error)=>{
    console.log('HEY MITCH - COULDN\'T GET THE IMAGES BY DATE', error); 
    res.sendStatus(500);});
})

//get all images created in the past 5 hours or if show=true
router.get('/', (req, res) => {
  //fix this !
  const query  = `SELECT * FROM "images" WHERE "created" BETWEEN NOW() - INTERVAL '5 HOURS' AND NOW()
  OR "images"."show" = true ORDER BY "images"."created" ASC;`;
  pool.query(query)
  .then((result) => {res.send(result.rows);})
  .catch((error)=>{
    console.log('HEY MITCH - COULDN\'T GET THE IMAGES', error); 
    res.sendStatus(500);});
});

//get all images that were created TODAY
router.get('/today', (req, res) => {
  const query  = `SELECT * FROM "images" WHERE date_part('day', "created")=date_part('day', now())
  ORDER BY "created" ASC;`;
  pool.query(query)
  .then((result) => {res.send(result.rows);})
  .catch((error)=>{
    console.log('HEY MITCH - COULDN\'T GET THE IMAGES', error); 
    res.sendStatus(500);});
});

//accepts an image posted from raspberry pi
router.post('/', (req, res) => {
  const newImage = req.body.url;
  console.log(`adding newImage ${newImage}`);
  const query = `INSERT INTO "images" ("url") VALUES ($1);`;
  pool.query(query, [newImage])
  .then((result) =>{
      res.sendStatus(201);
  })
  .catch((error) => {
    console.log(`HEY MITCH - YOU GOT AN ERROR ${error}`);
    res.sendStatus(500);
  })
});

module.exports = router;