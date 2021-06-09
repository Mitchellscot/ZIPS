const fs = require('fs');
const axios = require('axios');
const Path = require('path');

async function downloadFile(url) {
    var filename = url.substring(url.lastIndexOf('/')+1);
    const path = Path.resolve("/home/mitch/Pictures/watermark/", filename);
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

module.exports = downloadFile;