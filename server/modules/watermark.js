const fs = require('fs');
const axios = require('axios');
const { exec } = require("child_process");

//download the image from AWS
async function downloadFile(url, path) {
    const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream'
      });
    response.data.pipe(fs.createWriteStream(path));
    return new Promise((resolve, reject) => {
        response.data.on('end', () => {
          resolve()
        });
        response.data.on('error', () => {
          reject()
        });
      })
}

//create a new watermarked image
async function watermarkImage(path) {
    return 0;
}

//create a thumbnail
function thumbImage(path, fileName) {
  const command = `convert ${path} -thumbnail 256x320 /home/mitch/Pictures/watermark/th-${fileName.slice(0, -4)}.gif`;
  exec(command, (error, stdout, stderr)=>{
    if (error){
        console.log(`error: ${error.message}`);
    return;
    }
    if (stderr){
        console.log(`stderr: ${stderr}`);
        return;
    }
    if (stdout)
    {
        console.log(`stdout: ${stdout}`);
    }
    return;
  });
}

module.exports = {downloadFile, thumbImage};