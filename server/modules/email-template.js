function createEmailTemplate(images, header, body, businessName, businessEmail, businessWebsite, businessPhone){

    let links = '';
    let signature = `<hr /><p>${businessName}</p><p>${businessPhone}</p><p><a href= \"mailto: ${businessEmail}\">${businessEmail}</a></p><a href= \"https://${businessWebsite}\">${businessWebsite}</a></p>`;
    for (url of images){
        links += `<li><a href=${url}>Click here to download your photo</a></li>`   
    }
    return '<h1>'+ header + '</h1>' + '<p>' + body + '</p>' + '<ul>' + links + '</ul>' + signature;
}

function createPlainTextEmail(images, header, body, businessName, businessEmail, businessWebsite, businessPhone){
    
    let signature = `\n\n${businessName} \n${businessPhone} \n${businessEmail} \n${businessWebsite}`
    let links = '';
    for (url of images){
        links += `${url}\n`   
    }
    return header + `\n` + body + `\n` +links + signature;
}

module.exports = {
    createEmailTemplate,
    createPlainTextEmail
}

/* let header = "Thank you for your order!";
let body = `To download the photos, click on the link and then right click and select "Save Image As". If you have any trouble downloading the pictures, please let us know by replying to this email address or by contacting as at the number below.</p><p>Thank you so much for choosing us for your outdoor adventure!`;
let businessName = "Brainerd Zip Line Tour";
let businessEmail = "bztinfo@ziplinemn.com";
let businessWebsite = "www.ZipBrainerd.com";
let businessPhone = "(218) 656-1111"; */