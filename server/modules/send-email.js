require('dotenv').config();
var AWS = require('aws-sdk');


function sendEmail(emailBody, plainTextEmail, sendToAddress, sourceEmail, replyEmail, subject){

  const SESConfig = {
    accessKeyId: process.env.ACCESS_KEY_ID,
    accessSecretKey: process.env.SECRET_ACCESS_KEY,
    region: "us-east-2"
  }
  AWS.config.update(SESConfig);

    var params = {
      Destination: {
        ToAddresses: [
          sendToAddress
        ]
      },
      Message: { 
        Body: {
          Html: {
           Charset: "UTF-8",
           Data: emailBody
          },
          Text: {
           Charset: "UTF-8",
           Data: plainTextEmail
          }
         },
         Subject: {
          Charset: 'UTF-8',
          Data: subject
         }
        },
      Source: sourceEmail,
      ReplyToAddresses: [
        replyEmail
      ],
    };

  console.log(`params ${params}`);  
  // Create the promise and SES service object
  var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
  
  // Handle promise's fulfilled/rejected states
  return sendPromise.then(
    function(data) {
      console.log(`Here is the message id: ${data.MessageId}`);
    }).catch(
      function(err) {
      console.error(`HEY MITCH - ERROR OCCURING IN SEND_EMAIL - ${err, err.stack}`);
    });

}

module.exports = sendEmail;

