const keys = require('./../config/config');

var admin = (req, res, next) => {

  // Check for access code. Set key to the access code label
  var key = req.body.accessCode;

  if(key === process.env.ACCESS_CODE) {
    next();
  } else {
    res.redirect('/');
    console.log('Error. Not authorized.');
  }
}
