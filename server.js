const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const keys = require('./config/config')
//var config = require('./config/config.json');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

// View engine setup
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// STOPS WEBSITE FROM RUNNING
// NOTE: MAINTENANCE MODE
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// Static Folder
app.use(express.static(__dirname + '/public'));

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About'
  });
});

app.get('/drivers', (req, res) => {
  res.render('drivers.hbs', {
    pageTitle: 'Drivers'
  });
});

app.get('/advertisers', (req, res) => {
  res.render('advertisers.hbs', {
    pageTitle: 'Advertisers'
  });
});

app.get('/contact', (req, res) => {
  res.render('contact.hbs', {
    pageTitle: 'Contact'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

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
      port: 587,
      secure: false,
      auth: {
        user: keys.companyEmail,
        pass: keys.companyPassword
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    let mailOptions = {
      from: '"Contact -- Population Advertisements"',
      to: keys.companyEmail,
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

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
