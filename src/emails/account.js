const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.sendgridApiKey)


// sgMail.send({
//     to:'nawanihappy@gmail.com',
//     from :'nawanihappy@gmail.com',
//     subject:'this is first',
//     text:'hope you recive it'
// })


const sendWelcomeEmail = (email,name) => {

sgMail.send({
    to:email,
    from :'nawanihappy@gmail.com',
    subject: 'Thanks for joinging in',
    text: `Welcome to the app, ${name} . Let me know `
})
}
const sendRemovalEmail = (email,name) =>{
    sgMail.send({
        to:email,
        from :'nawanihappy@gmail.com',
        subject: 'Thanks for being with us',
        text: `bye bye from the app, ${name} . Let us know what did we do wrong`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendRemovalEmail
}