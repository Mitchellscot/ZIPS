const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const paginate = require('jw-paginate');
const {downloadFile, thumbImage} = require('../modules/watermark');
const Path = require('path');
const upload = require('../modules/aws-upload');


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
      const pager = paginate(result.rows.length, page, 15);
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
  //fix this !
  const query = `SELECT * FROM "images" WHERE "created" BETWEEN NOW() - INTERVAL '5 HOURS' AND NOW()
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
  const query = `SELECT * FROM "images" WHERE date_part('day', "created")=date_part('day', now())
  ORDER BY "created" ASC;`;
  pool.query(query)
    .then((result) => {
      const pager = paginate(result.rows.length, page, 15);
      const pageOfPictures = result.rows.slice(pager.startIndex, pager.endIndex + 1);
      res.send({ pager, pageOfPictures });
    })
    .catch((error) => {
      console.log('HEY MITCH - COULDN\'T GET THE IMAGES', error);
      res.sendStatus(500);
    });
});

//accepts an image posted from raspberry pi
router.post('/', (req, res) => {
  const newImage = req.body.url;
  const filename = newImage.substring(newImage.lastIndexOf('/') + 1);
  console.log('this is fileName', filename);
  const path = Path.resolve("/home/mitch/Pictures/watermark/", filename);
  //download the image to disk
  downloadFile(newImage, path).then(async () => {
    //create a thumbnail
    thumbImage(path, filename);
    const thumbnailPath = `${path.substring(0, path.lastIndexOf('/') + 1)}th-${filename.slice(0, -4)}.gif`;
    try {
      const thumbUrl = await upload(thumbnailPath, process.env.BUCKET_NAME_THUMBS, '');
    } catch (error) {
      console.log(error);
    }
    
  })
  console.log(`adding newImage ${newImage}`);
  const query = `INSERT INTO "images" ("url") VALUES ($1);`;
  pool.query(query, [newImage])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`HEY MITCH - YOU GOT AN ERROR ${error}`);
      res.sendStatus(500);
    });
});

module.exports = router;