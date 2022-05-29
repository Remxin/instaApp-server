const nodemailer = require("nodemailer")
const config = {
    service: 'Yahoo',
    auth: {
        user: process.env.YAHOO_LOGIN,
        pass: process.env.YAHOO_PASS
    }
}

const transporter = nodemailer.createTransport(config)

module.exports = {
    sendVerifyEmail: (destinationEmail, token) => {
        return new Promise((resolve, reject) => {
            try {
                transporter.sendMail({
                    from: `Insta App <${process.env.YAHOO_LOGIN}>`,
                    to: destinationEmail,
                    subject: "Verify your accont",
                    text: "text",
                    html: "html"
                });

                resolve({ msg: "Successfully send email" })
            } catch (err) {
                reject({ err })
            }
        })
    }
}