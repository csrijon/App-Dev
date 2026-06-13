import express, { text } from "express"
import nodemailer from "nodemailer"

const router = express.Router()

function otpgen() {
    return Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000;
}

router.post("/", async (req, res) => {

    try {
        const transpoter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "chowdhurysrijon78@gmail.com",
                pass: process.env.APPPASS
            }
        })

        const otp = otpgen()
        console.log("wantotp", otp)

        const sendoption = {
            from: "chowdhurysrijon78@gmail.com",
            to: "csrijon92@gmail.com",
            subject: "sendmail for testing",
            text: `This is your otp do not send anyone ${otp}`
        }

        await transpoter.sendMail(sendoption)
        
        res.send("mailsend done")
    } catch (error) {
        res.send("mail sending error")
    }
}
)

export default router