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

module.exports = { downloadFile };