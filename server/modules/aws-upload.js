const AWS = require('aws-sdk');
const fs = require('fs');

function awsUpload(bucketName, path) {
    const s3 = new AWS.S3({
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        region: 'us-east-2'
    });

    if (fs.existsSync(path)) {
        const fileContent = fs.readFileSync(path);
        const params = {
            Bucket: bucketName,
            Key: filename,
            Body: fileContent,
            ContentType: "image/jpeg",
            ACL: 'public-read'
        };
        s3.upload(params, async (error, data) => {
            try {
                if (error) {
                    console.log(error);
                }
                else {
                    let imageUrl = '';
                    console.log(data.Location);
                    let url = data.Location;
                    //post to the database when callbacks are done
                    if (imageUrl !== url && url.endsWith(".jpg") || url.endsWith(".png")) {
                        imageUrl = url;

                        //finish the query!!!!!!!!!!!!!!!!!!!!!!!!
                        //SET the image type: image, thumb, watermark depending on input parameter!
                        const query = `INSERT INTO ${table} AND FINISH THIS QUERY SET WATERMARK OR THUMB URL`;

                        await axios.post("http://localhost:5000/api/image", { url: data.Location })
                            .then((response) => {
                            console.log(`response from the post to ${bucketName}: ${response.data}`);
                            //fs.unlink(`/home/mitch/Pictures/motion/${filename}`);
                            if (err) {
                            console.log(err);
                            }
                        }).catch((error) => console.log(`error making the post to the DB: ${error}`));
                    }
                }
            } catch (error) {
                console.log(error);
            }
        });
    }
}

module.exports = awsUpload;