const AWS = require('aws-sdk');
const fs = require('fs');

async function awsUpload(path, imageType, filename) {
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
    return s3.upload(params).promise();
}

module.exports = awsUpload;