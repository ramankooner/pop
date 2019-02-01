const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
var sslRedirect = require('strong-ssl-redirect');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

// SSL Redirect
var environment = 'production';

// Redirect.
app.use(sslRedirect({
  environment,
  www: true,
  status: 301
}));

// View engine setup
app.set('view engine', 'hbs');

// Serer Logs
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

// Helper function to get current year
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

// Require Routes
require('./routes/mainRoutes')(app);
require('./routes/notificationRoutes')(app);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
