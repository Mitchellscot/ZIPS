const express = require('express');
const EmailTemplate = require('../modules/email-template');
const sendEmail = require('../modules/send-email');
const router = express.Router();

router.get('/', (req, res) => {
    // GET route code here... maybe...
});

router.post('/', (req, res) => {
    let images = req.body.images;
    let name = req.body.name;
    let emailAddress = req.body.email;
    let email = EmailTemplate.createEmailTemplate(images, name);
    let plainTextEmail = EmailTemplate.createPlainTextEmail(images, name);
    try {
        sendEmail(email, plainTextEmail, emailAddress, name).then(() => {
            res.sendStatus(200);
        });
    }
    catch (error) {
        console.log(`HEY MITCH - COULDN'T SEND THE PHOTOS! ${error}`);
        res.sendStatus(500);
    }
});

module.exports = router;
