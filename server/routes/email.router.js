const express = require('express');
const EmailTemplate = require('../modules/email-template');
const sendEmail = require('../modules/send-email');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/', (req, res) => {
    //from the post
    let images = req.body.images;
    let orderId = req.body.orderId;
    let total = req.body.total;
    let name = req.body.name;
    let emailAddress = req.body.email;
    //email settings from the database
    let sourceEmail = '';
    let replyEmail = '';
    let subject = '';
    let header = '';
    let body = '';
    let businessName = '';
    let businessEmail = '';
    let businessWebsite = '';
    let businessPhone = '';
    //getting the email settings
    const queryTest = `SELECT * FROM "email_settings";`
    pool.query(queryTest).then((result) => {
        let emailSettings = result.rows[0];
        sourceEmail = emailSettings.source_email;
        replyEmail = emailSettings.reply_to_email;
        subject = emailSettings.subject;
        header = emailSettings.header;
        body = emailSettings.body;
        businessName = emailSettings.business_name;
        businessEmail = emailSettings.business_email;
        businessWebsite = emailSettings.business_website;
        businessPhone = emailSettings.business_phone;
        //create email bodies (both html and plain text) with the above information
        let email = EmailTemplate.createEmailTemplate(images, header, body, businessName, businessEmail, businessWebsite, businessPhone);
        let plainTextEmail = EmailTemplate.createPlainTextEmail(images, header, body, businessName, businessEmail, businessWebsite, businessPhone);
        //try sending the email with the above information
        try {
            sendEmail(email, plainTextEmail, emailAddress, sourceEmail, replyEmail, subject).then(() => {
                res.sendStatus(200);
            }).catch((error) => {
                console.log(error);
                res.sendStatus(500);
            })
        }
        catch (error) {
            console.log(`HEY MITCH - COULDN'T SEND THE PHOTOS! ${error}`);
            res.sendStatus(500);
        }
    }).catch((error) => {
        console.log(`HEY MITCH - COULDN'T GET THE EMAIL SETTINGS ${error}`);
        return;
    })
});

module.exports = router;
