const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.put('/show/:id', (req, res) => {
  console.log(req.body.show);
  console.log(req.params.id);
  const query = `UPDATE "images" SET "show"=$1 WHERE "id"=$2;`;
  pool.query(query, [req.body.show, req.params.id])
      .then((result) => {
          res.sendStatus(200);
      }).catch((error) => {
          console.log(`HEY MITCH - COULDN'T SHOW THE PICTURE! ${error}`);
          res.sendStatus(500);
      })
})

router.delete('/delete/:id', (req, res) => {
  pool.query('DELETE FROM "images" WHERE id=$1;', [req.params.id])
      .then((result) => {
          res.sendStatus(200);
      }).catch((error) => {
          console.log(`HEY MITCH - COULDN'T DELETE THE IMAGE ${error}`);
          res.sendStatus(500);
      })
});

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
  ORDER BY "show" DESC, "created" ASC;`
  pool.query(queryText)
  .then((result) => {res.send(result.rows);})
  .catch((error)=>{
    console.log('HEY MITCH - COULDN"T GET THE IMAGES BY DATE', error); 
    res.sendStatus(500);});
})

//get all images that were created TODAY
router.get('/', (req, res) => {
  const query  = `SELECT * FROM "images" WHERE date_part('day', "created")=date_part('day', now())
  ORDER BY "show" DESC, "created" ASC;`;
  pool.query(query)
  .then((result) => {res.send(result.rows);})
  .catch((error)=>{
    console.log('HEY MITCH - COULDN"T GET THE IMAGES', error); 
    res.sendStatus(500);});
});

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