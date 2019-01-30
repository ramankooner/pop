const nodemailer = require('nodemailer');
const keys = require('./../config/keys');

module.exports = (app) => {
  // Contact Form Email Sender
  app.post('/send', (req, res) => {

    const output = `
      <h3> Contact Form Request </h3>
      <p> Contact Details </p>
      <ul>
        <li>First Name: ${req.body.firstname}</li>
        <li>Last Name: ${req.body.lastname}</li>
        <li>Email: ${req.body.email}</li>
      </ul>
      <h3>Message </h3>
      <p>${req.body.message}</p>`;

      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.COMPANY_EMAIL || keys.companyEmail,
          pass: process.env.COMPANY_PASSWORD || keys.companyPassword
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      let mailOptions = {
        from: '"Contact -- Population Advertisements"',
        to: process.env.COMPANY_EMAIL || keys.companyEmail,
        subject: 'Node Contact Request',
        text: 'Contact Request',
        html: output
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('contact', {msg: 'Email has been sent'});
      });
  });
};
