const nodemailer = require('nodemailer');
require('./../config/config');

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
          user: process.env.COMPANY_EMAIL,
          pass: process.env.COMPANY_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      let mailOptions = {
        from: '"Contact -- Population Advertisements"',
        to: process.env.COMPANY_EMAIL,
        subject: `Contact Request -- ${req.body.firstname} ${req.body.lastname}`,
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

  // Sign Up Form Email Sender
  app.post('/sendSignUp', (req, res) => {

    const output = `
      <h3> Sign Up Form Request </h3>
      <p> Sign Up Details </p>
      <h3> Personal Information </h3>
      <ul>
        <li>Email: ${req.body.email}</li>
        <li>First Name: ${req.body.firstname}</li>
        <li>Last Name: ${req.body.lastname}</li>
        <li>Birth Date: ${req.body.birthDate}</li>
        <li>Address 1: ${req.body.address1}</li>
        <li>Address 2: ${req.body.address2}</li>
        <li>City: ${req.body.city}</li>
        <li>Zipcode: ${req.body.zipCode}</li>
        <li>State: ${req.body.state}</li>
        <li>Phone Number: ${req.body.phoneNumber}</li>
      </ul>
      <h3> Car Information </h3>
      <ul>
        <li>Car Make: ${req.body.carMake}</li>
        <li>Car Model: ${req.body.carModel}</li>
        <li>Car Year: ${req.body.carYear}</li>
        <li>Car Style: ${req.body.carStyle}</li>
      </ul>`;

      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.COMPANY_EMAIL,
          pass: process.env.COMPANY_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      let mailOptions = {
        from: '"Sign Up -- Population Advertisements"',
        to: process.env.COMPANY_EMAIL,
        subject: `Sign Up Request -- ${req.body.firstname} ${req.body.lastname}`,
        text: 'Sign Up Request',
        html: output
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('signUp', {msg: 'Email has been sent'});
      });
  });
};
