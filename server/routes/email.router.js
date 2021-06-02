const express = require('express');
const EmailTemplate = require('../modules/email-template');
const sendEmail = require('../modules/send-email');
const router = express.Router();
const pool = require('../modules/pool');
const paginate = require('jw-paginate');


//gets emails for a given date
router.get('/date', (req, res) =>{
    const page = parseInt(req.query.page) || 1;
    let query = req.query.q;
    let queryText = `SELECT "emails"."id", "emails"."date_sent", "emails"."email_address", "emails"."email_text", "emails"."name", "emails"."total", array_agg("url") 
    FROM "emails"
    JOIN "order_ids" ON "order_ids"."order_id"="emails"."order_id"
    JOIN "images" ON "order_ids"."image_id"="images"."id"
    WHERE CAST("emails"."date_sent" as date) = date '${query}'
    GROUP BY "emails"."id", "emails"."date_sent", "emails"."email_address", "emails"."email_text", "emails"."name", "emails"."total"
    ORDER BY "date_sent" DESC;`
    pool.query(queryText).then((result) => {
        const pager = paginate(result.rows.length, page, 8);
        const pageOfEmails = result.rows.slice(pager.startIndex, pager.endIndex + 1);
        res.send({pager, pageOfEmails});
    }).catch((error) => {
        console.log(`HEY MITCH - COULDN'T GET THE SEARCHED EMAILS ${error}`);
        res.sendStatus(500);
    })
})

router.get('/', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    let queryText = '';
    let query = req.query.q;
    if (query === undefined) {
        queryText = `
        SELECT "emails"."id", "emails"."date_sent", "emails"."email_address", "emails"."email_text", "emails"."name", "emails"."total", array_agg("url") 
        FROM "emails"
        JOIN "order_ids" ON "order_ids"."order_id"="emails"."order_id"
        JOIN "images" ON "order_ids"."image_id"="images"."id"
        GROUP BY "emails"."id", "emails"."date_sent", "emails"."email_address", "emails"."email_text", "emails"."name", "emails"."total"
        ORDER BY "date_sent" DESC;
        `
    }
    else {
        queryText= `
        SELECT "emails"."id", "emails"."date_sent", "emails"."email_address", "emails"."email_text", "emails"."name", "emails"."total", array_agg("url") 
        FROM "emails"
        JOIN "order_ids" ON "order_ids"."order_id"="emails"."order_id"
        JOIN "images" ON "order_ids"."image_id"="images"."id"
        WHERE "emails"."name" ILIKE '%${query}%' 
        OR "emails"."email_address" ILIKE '%${query}%' 
        GROUP BY "emails"."id", "emails"."date_sent", "emails"."email_address", "emails"."email_text", "emails"."name", "emails"."total"
        ORDER BY "date_sent" DESC;
        `;
    }
        pool.query(queryText).then((result)=>{
            const pager = paginate(result.rows.length, page, 8);
            const pageOfEmails = result.rows.slice(pager.startIndex, pager.endIndex + 1);
            res.send({pager, pageOfEmails});
        }).catch((error)=>{
            console.log(`HEY MITCH - COULDN"T GET THE SEARCHED EMAIL HISTORY ${error}`);
             res.sendStatus(500);
            });
});

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
    let businessEmail='';
    let businessWebsite='';
    let businessPhone='';
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
                //after sending an email, enter the sent email into the database
                const query = `INSERT INTO "emails" ("name", "email_address", "email_text", "total", "order_id")
                VALUES($1, $2, $3, $4, $5);`
                pool.query(query, [name, emailAddress, email, total, orderId]).then((result)=>{
                    res.sendStatus(200);
                }).catch((error)=>{
                    console.log(`HEY MITCH - COULDN'T ADD TO EMAILS TABLE ${error}`);
                     res.sendStatus(500);
                    }) 
            });
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
