const sgMail = require('@sendgrid/mail')



sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'xSPx@ukr.net',
        subject: 'Thanks for joining in!',
        text: `Welcom to the app, ${name}. Let me know how you get alone this the app.`
    })
}

const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'xSPx@ukr.net',
        subject: 'Goodbye!',
        text: `Goodbye, ${name}. I will miss you.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}
