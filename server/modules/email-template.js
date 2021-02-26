function createEmailTemplate(images, name){
    let heading = `<h1>Hello ${name} - Thank you for your order!</h1><h4>Here is a link for each photo you purchased from us:</h4><ul>`
    const closing = "</ul><p>To download the photos, click on the link and then right click and select 'Save Image As'. If you have any trouble downloading the pictures, please let us know by replying to this email address or by contacting as at the number below.</p><p>Thank you so much for choosing us for your outdoor adventure!</p><hr /><address><p>Brainerd Zip Line Tour</p><p>218-656-1111</p><p><a href= \"mailto: bztinfo@ziplinemn.com\">bztinfo@ziplinemn.com</a></p><a href= \"https://www.ZipBrainerd.com\">ZipBrainerd.com</a></p></address>"

    for (url of images){
        heading += `<li><a href=${url}>Click here to download your photo</a></li>`   
    }
    return heading + closing
}

function createPlainTextEmail(images, name){
    let heading = `Hello ${name} - Thank you for your order! Here is a link for each photo you purchased from us:\n `
    const closing = "If you have any trouble downloading the pictures, please let us know by replying to this email address or by contacting as at the number below. Thank you so much for choosing us for your outdoor adventure! \n\nBrainerd Zip Line Tour \n218-656-1111 \nbztinfo@ziplinemn.com \nwww.ZipBrainerd.com"
    
    for (url of images){
        heading += `${url}\n`   
    }
    return heading + closing
}

module.exports = {
    createEmailTemplate,
    createPlainTextEmail
}