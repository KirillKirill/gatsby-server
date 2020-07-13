const bodyParser = require("body-parser")
const express = require("express")
const nodemailer = require("nodemailer")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const PORT = 1000
const contactAddress = "kbochkarev2009@gmail.com"

const mailer = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_PASSWORD,
    },
})
app.post("/contact", function (req, res) {
    const {body: {name, email, message}} = req
    mailer.sendMail(
        {
            from: `${name} <${email}>`,
            to: [contactAddress],
            subject: "Test",
            html: message || "[No message]",
        },
        function (err, info) {
            if (err) return res.status(500).send(err)
            res.json({ success: true })
        }
    )
})

app.listen(PORT, () => console.log(`running on ${PORT}`))