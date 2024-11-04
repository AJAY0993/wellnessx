import nodemailer from 'nodemailer'

const sendEmail = async (
    email: string,
    subject: string,
    message: string,
    cb: () => void
) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL,
                pass: process.env.GMAIL_PASSWORD,
            },
        })

        const mailOptions = {
            from: 'WellnessX@email.com',
            to: email,
            subject,
            text: message,
        }

        await transporter.sendMail(mailOptions)
    } catch (e) {
        console.log(e)
        cb()
    }
}

export default sendEmail
