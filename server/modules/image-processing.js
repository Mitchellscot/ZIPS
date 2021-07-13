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
  let buffer = await response.data.pipe(fs.createWriteStream(path));
  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      console.log('all done downloading');
      resolve();
    });
    response.data.on('error', () => {
      console.log('download rejected');
      reject()
    });
  })
}

//create a new watermarked image
async function watermarkImage(path, filename) {
  const command = `composite -quiet -watermark 75 -gravity northeast /home/mitch/Code/zips/public/watermark-lg.png ${path} /home/mitch/Pictures/watermark/th-${fileName}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error in thumbImage error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`error in thumbImage stderr: ${stderr}`);
      return;
    }
    if (stdout) {
      console.log(`error in thumbImage stdout: ${stdout}`);
      return;
    }
    return;
  });
}

//create a thumbnail
async function thumbImage(path, fileName) {
  const thumbnailName = `th-${fileName.slice(0, -4)}.gif`
  const command = `convert ${path} -quiet -thumbnail 256x320 /home/mitch/Pictures/watermark/${thumbnailName}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error in thumbImage error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`error in thumbImage stderr: ${stderr}`);
      return;
    }
    if (stdout) {
      console.log(`error in thumbImage stdout: ${stdout}`);
      return;
    }
    return new Promise((resolve) => {
      if (fs.existsSync(path)) {
        console.log('all done converting');
        resolve(true);
      };
  });
});
}
module.exports = { downloadFile, thumbImage, watermarkImage };