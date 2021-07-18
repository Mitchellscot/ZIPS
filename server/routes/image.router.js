const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const paginate = require('jw-paginate');
var cors = require('cors');
const { downloadFile } = require('../modules/image-processing');
const Path = require('path');
const upload = require('../modules/aws-upload');
const { execSync } = require('child_process');
const defaultFolder = process.env.HOME_FOLDER || "/home/mitch/";
const watermarkLogo = process.env.HOME_FOLDER + '/public/watermark-md.png' || "/home/mitch/Code/zips/public/watermark-md.png"
var whiteList = ['https://bztphotos.ddns.net', undefined];
const corsOptions = {
  origin: function (origin, callback){
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed!'));
    }
  },
  optionsSucessStatus: 201
};

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
  const page = parseInt(req.query.page) || 1;
  let date = req.query.q;
  let queryText = `SELECT * FROM "images" WHERE "show"=true ORDER BY "created" ASC;`;
  pool.query(queryText)
    .then((result) => {
      const pager = paginate(result.rows.length, page, 12);
      const pageOfPictures = result.rows.slice(pager.startIndex, pager.endIndex + 1);
      res.send({ pager, pageOfPictures, date });
    })
    .catch((error) => {
      console.log('HEY MITCH - COULDN\'T GET THE IMAGES MARKED AS SHOWN', error);
      res.sendStatus(500);
    });
});

//selects all images that were created on a given date - pagination enabled
router.get('/date', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  let date = req.query.q;
  const queryText = `SELECT * FROM "images" WHERE CAST("created" as date) = date '${date}' 
  ORDER BY "created" ASC;`
  pool.query(queryText)
    .then((result) => {
      const pager = paginate(result.rows.length, page, 12);
      const pageOfPictures = result.rows.slice(pager.startIndex, pager.endIndex + 1);
      res.send({ pager, pageOfPictures, date });
    })
    .catch((error) => {
      console.log('HEY MITCH - COULDN\'T GET THE IMAGES BY DATE', error);
      res.sendStatus(500);
    });
});

//get all images created in the past 3 hours or if show=true
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

//accepts an image posted from raspberry pi
router.post('/', cors(corsOptions), async (req, res) => {
  const fullImageUrl = req.body.url;
  const fullImageFilename = fullImageUrl.substring(fullImageUrl.lastIndexOf('/') + 1);
  const fullImagePath = Path.resolve(defaultFolder, fullImageFilename);
  const thumbnailPath = `${defaultFolder}th-${fullImageFilename.slice(0, -4)}.gif`;
  const watermarkPath = `${defaultFolder}wm-${fullImageFilename}`;

  try {
    const image = await downloadFile(fullImageUrl, fullImagePath);
    const thumbnailing = execSync(`convert -quiet -define jpeg:size=518x389 ${fullImagePath} -thumbnail 414x311 ${thumbnailPath}`);
    const resizing = execSync(`convert -quiet -resize 1296x972 ${fullImagePath} ${fullImagePath}`);
    const watermarking = execSync(`composite -quiet -watermark 100 -gravity northeast ${watermarkLogo} ${fullImagePath} ${watermarkPath}`);
    const thumbnailUpload = await upload(thumbnailPath, 'thumbnail', fullImageFilename);
    const watermarkUpload = await upload(watermarkPath, 'watermark', fullImageFilename);
    const query = `INSERT INTO "images" ("url", "th_url", "wm_url") VALUES ($1, $2, $3);`;
    const result = await pool.query(query, [fullImageUrl, thumbnailUpload.Location, watermarkUpload.Location]);
  }
  catch(err){
    console.log('HEY MITCH - ERROR PROCESSING IMAGES', err);
    res.sendStatus(500);
  }
  res.sendStatus(201);
});

//route for testing purposes
router.post('/test', async (req, res) => {
  const fullImageUrl = req.body.url;
  const thumbImageUrl = req.body.th_url;
  const watermarkImageUrl = req.body.wm_url;
  const query = `INSERT INTO "images" ("url", "th_url", "wm_url") VALUES ($1, $2, $3);`;
  try{
    const result = await pool.query(query, [fullImageUrl, thumbImageUrl, watermarkImageUrl]);
    res.sendStatus(201);
  }
  catch(err){
    console.log('HEY MITCH - ERROR PROCESSING IMAGES', err);
    res.sendStatus(500);
  }
})

module.exports = router;