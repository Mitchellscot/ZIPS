const AWS = require('aws-sdk');
const fs = require('fs');
const pool = require('../modules/pool');

async function awsUpload(path, imageType, filename, createdImageId) {
    const bucketName = imageType == 'thumbnail' ? process.env.BUCKET_NAME_THUMBS : process.env.BUCKET_NAME_WATERMARKS;
    const s3 = new AWS.S3({
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        region: 'us-east-2'
    });
    const fileContent = await fs.readFileSync(path);
    const params = {
        Bucket: bucketName,
        Key: imageType == 'thumbnail' ? `th-${filename.slice(0, -4)}.gif` : `wm-${filename}`,
        Body: fileContent,
        ContentType: imageType == 'thumbnail' ? "image/gif" : "image/jpg",
        ACL: 'public-read'
    };
    console.log('begining upload of ', imageType);
    s3.upload(params, async (error, data) => {
        try {
            if (error) {
                console.log(error);
            }
            else {
                let imageUrl = '';
                console.log(`Here is the url: ${data.Location}`);
                let url = await data.Location;
                if (imageType == 'thumbnail') {
                    if (imageUrl !== url) {
                        const query = `UPDATE "images" SET "th_url"=$1 WHERE "id"=$2;`;
                        try {
                            const response = await pool.query(query, [url, createdImageId]);
                            console.log('thumbnail posted to DB');
                        }
                        catch (error) {
                            console.log(`HEY MITCH - YOU GOT AN ERROR POSTING THUMBNAIL TO THE DB ${error}`);
                        }
                    }
                }
                else {
                    if (imageUrl !== url && url.endsWith(".jpg")) {
                        const query = `UPDATE "images" SET "wm_url"=$1 WHERE "id"=$2;`;
                        try {
                            const response = await pool.query(query, [url, createdImageId]);
                            console.log('watermark posted to DB');
                        }
                        catch (error) {
                            console.log(`HEY MITCH - YOU GOT AN ERROR POSTING WATERMARK TO THE DB ${error}`);
                        }
                    }
                }
            }
        } catch (error) { console.log(error); }
    });

}

module.exports = awsUpload;