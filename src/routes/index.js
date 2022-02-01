const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();




router.post('/send-email', async (req, res) => {
    const { name, email, phone, message } = req.body; // para evitar poner 'req.body.name ... req.body.email ... etc

    //le damos formato html
    contentHTML = `     
        <h1>User Information</h1>
        <ul>
            <li>Username: ${name}</li>
            <li>User Email: ${email}</li>
            <li>PhoneNumber: ${phone}</li>
        </ul>
        <p>${message}</p>
    `;
    require('dotenv').config();
    // config del nodemailer - A dónde lo enviamos
    const transporter = nodemailer.createTransport({ 
        host:  process.env.HOST,
        port: 465,
        secure: true, 
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });
  

    // config del nodemailer - qué enviamos
    let info = await transporter.sendMail({
        from: '"Portfolio" <mcellamare@example.com>', // sender address,
        to: 'cellamarematias@gmail.com',
        subject: 'Portfolio Contact Form',
        // text: 'Hello World'
        html: contentHTML
    })

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.redirect('/success.html');
});



module.exports = router;
