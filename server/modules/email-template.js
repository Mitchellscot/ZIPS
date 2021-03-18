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