const nodemailer = require("nodemailer")
require("dotenv").config()
const config = {
    service: 'Yahoo',
    auth: {
        user: process.env.YAHOO_LOGIN,
        pass: process.env.YAHOO_PASS
    }
}

// console.log(config)
const transporter = nodemailer.createTransport(config)

module.exports = {
    sendVerifyEmail: (destinationEmail, token) => {

        return new Promise((resolve, reject) => {
            const link = "http://localhost:3000/api/user/confirm/" + token
            try {
                transporter.sendMail({
                    from: `Insta App <${process.env.YAHOO_LOGIN}>`,
                    to: destinationEmail,
                    subject: "Verify your accont",
                    text: "Zweryfikuj swoje konto klikając w ten link (link ważny tylko godzinę)",
                    html: `<a href="${link}">${link}</a>`
                });

                resolve({ msg: "Successfully send email" })
            } catch (err) {
                reject({ err })
            }
        })
    }
}