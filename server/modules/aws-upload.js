/* const AWS = require('aws-sdk');
const fs = require('fs');

async function awsUpload(bucketName, path, table) {
    const s3 = new AWS.S3({
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        region: 'us-east-2'
    });
    if (fs.existsSync(path)) {
        const fileContent = await fs.readFileSync(path);
        const params = {
            Bucket: bucketname,
            Key: filename,
            Body: fileContent,
            ContentType: "image/jpeg",
            ACL: 'public-read'
        }
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
                    if (imageUrl !== url && url.endsWith(".jpg")) {
                        imageUrl = url;
                        const query = `INSERT INTO ${table} `
                        await axios.post("http://192.168.1.46:5000/api/image", {
                            url: data.Location
                        }).then((response) => {
                            console.log(`response from the post: ${response.data}`);
                            fs.unlink(`/home/mitch/Pictures/motion/${filename}`, (err) => {
                            if (err) {
                            console.log(err);
                            }
                        })
                        }).catch((error) => {
                            console.log(`error making the post to the DB: ${error}`)
                        })
                    }
                }
            } catch (error) {
                console.log(error);
            }
    }


}


module.exports = awsUpload; */