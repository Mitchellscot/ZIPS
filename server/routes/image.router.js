const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const paginate = require('jw-paginate');
var cors = require('cors');
const { downloadFile, thumbImage, watermarkImage } = require('../modules/image-processing');
const Path = require('path');
const upload = require('../modules/aws-upload');
const sharp = require('sharp');
const { execSync } = require('child_process');

//sets show=true for a given image. Default is false.
router.put('/show/:id', (req, res) => {
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
router.get('/shown', (req, res) => {
  let queryText = `SELECT * FROM "images" WHERE "show"=true;`;
  pool.query(queryText)
    .then((result) => { res.send(result.rows); })
    .catch((error) => {
      console.log('HEY MITCH - COULDN\'T GET THE IMAGES MARKED AS SHOWN', error);
      res.sendStatus(500);
    });
})

//selects all images that were created on a given date - pagination enabled
router.get('/date', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  let query = req.query;
  const queryText = `SELECT * FROM "images" WHERE CAST("created" as date) = date '${query.q}' 
  ORDER BY "created" ASC;`
  pool.query(queryText)
    .then((result) => {
      const pager = paginate(result.rows.length, page, 12);
      const pageOfPictures = result.rows.slice(pager.startIndex, pager.endIndex + 1);
      res.send({ pager, pageOfPictures });
    })
    .catch((error) => {
      console.log('HEY MITCH - COULDN\'T GET THE IMAGES BY DATE', error);
      res.sendStatus(500);
    });
});

//get all images created in the past 5 hours or if show=true
router.get('/', (req, res) => {
  const query = `SELECT * FROM "images" WHERE "created" BETWEEN NOW() - INTERVAL '3 HOURS' AND NOW()
  OR "images"."show" = true ORDER BY "images"."created" ASC;`;
  pool.query(query)
    .then((result) => { res.send(result.rows); })
    .catch((error) => {
      console.log('HEY MITCH - COULDN\'T GET THE IMAGES', error);
      res.sendStatus(500);
    });
});

//get all images that were created TODAY - pagination enabled
router.get('/today', (req, res) => {

  const page = parseInt(req.query.page) || 1;
  const query = `SELECT * FROM "images" WHERE cast(created as date)=current_date
  ORDER BY "created" ASC;`;
  pool.query(query)
    .then((result) => {
      const pager = paginate(result.rows.length, page, 12);
      const pageOfPictures = result.rows.slice(pager.startIndex, pager.endIndex + 1);
      res.send({ pager, pageOfPictures });
    })
    .catch((error) => {
      console.log('HEY MITCH - COULDN\'T GET THE IMAGES', error);
      res.sendStatus(500);
    });
});

//old post request
/* router.post('/', cors(), (req, res) => {
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
}); */

//accepts an image posted from raspberry pi
router.post('/', cors(), async (req, res) => {
  const newImage = req.body.url;
  const filename = newImage.substring(newImage.lastIndexOf('/') + 1);
  const thumbnailPath = `/home/mitch/Pictures/watermark/th-${filename.slice(0, -4)}.gif`;
  const watermarkPath = `/home/mitch/Pictures/watermark/wm-${filename}`;
  const path = Path.resolve("/home/mitch/Pictures/watermark/", filename);
  const query = `INSERT INTO "images" ("url") VALUES ($1) RETURNING "id";`;

  try {
    const result = await pool.query(query, [newImage]);
    const createdImageId = result.rows[0].id;
    const image = await downloadFile(newImage, path);
    const thumbnailing = execSync(`convert -quiet -define jpeg:size=518x389 ${path} -thumbnail 414x311 ${thumbnailPath}`);
    console.log('all done thumbnailing');
    const watermarking = execSync(`composite -quiet -watermark 100 -gravity northeast /home/mitch/Pictures/watermark/watermark-lg.png ${path} ${watermarkPath}`);
    console.log('all done watermarking');
    const thumbnailUpload = await upload(path, 'thumbnail', filename, createdImageId);
    const watermarkUpload = await upload(path, 'watermark', filename, createdImageId);
  }
  catch(err){
    console.log('HEY MITCH - ERROR PROCESSING IMAGES', err);
    res.sendStatus(500);
  }
  console.log('Great job mitch, you are all done');
  res.sendStatus(201);
})
module.exports = router;