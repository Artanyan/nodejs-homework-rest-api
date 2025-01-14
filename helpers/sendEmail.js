const nodemailer = require("nodemailer")
require("dotenv").config()

const { EMAIL_PASSWORD } = process.env

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 25,
    secure: false,
    auth: {
        user: "alexandrtretyak96@meta.ua",
        pass: EMAIL_PASSWORD
    }
}

const transporter = nodemailer.createTransport(nodemailerConfig)

const sendEmail = async (data) => {
    const email = {
        ...data,
        from: "alexandrtretyak96@meta.ua",
    }
    await transporter.sendMail(email)
}

module.exports = sendEmail