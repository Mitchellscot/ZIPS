// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-2'});

function sendEmail(emailBody, plainTextEmail, sendToAddress, name){
    // Create sendEmail params 
var params = {
    Destination: {
      ToAddresses: [ sendToAddress,
        /* more items */
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
        Data: `Thank you for zipping with us ${name}!`
       }
      },
    Source: 'bztinfo@ziplinemn.com', 
    ReplyToAddresses: [
       'mscott@ziplinemn.com',
    ],
  };
  
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

