import nodemailer from 'nodemailer';
import { emailTemplate } from './emailTemplate.js';
import jwt from "jsonwebtoken"

export  async function emailConfirmed(email) {
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: 'localhost', // stmp.gmail.com
      auth: {
        user: "eslamhussin600@gmail.com",
        pass: 'fygg beto lfhg vjtd',
      },
    });
    
    // async..await is not allowed in global scope, must use a wrapper
      // send mail with defined transport object
      let token = jwt.sign(email,"EmailVery")
      console.log(email);
      const info = await transporter.sendMail({
        from: '"El3aw 👻" <eslamhussin600@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Verify Email ✔", // Subject line
        text: "Hi", // plain text body
        html: emailTemplate(token), // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}