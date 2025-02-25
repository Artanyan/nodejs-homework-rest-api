const { BadRequest, NotFound } = require("http-errors")

const { User } = require("../../models")
const { sendEmail } = require("../../helpers")

const reVerification = async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email })

    if (!email) {
        throw new BadRequest('Missing required field email')
    }
    if (!user) {
        throw NotFound()
    }
    if (user.verify) {
        throw new BadRequest("Verification has already been passed")
    }

    const verifyToken = user.verifyToken

    const mail = {
        to: email,
        subject: "Подтверждение регистрации на сайте",
        text: "Подтверждение регистрации на сайте",
        html: `
        <a target="_blank" 
            href="http://localhost:3000/api/users/verify/${verifyToken}">Нажмите для подтверждения email</a>
        `
    }

    sendEmail(mail)

    res.json({
        status: "success",
        code: 200,
        message: "Verification email sent"
    })
}

module.exports = reVerification