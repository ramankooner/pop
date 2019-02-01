const keys = require('./../config/config');
const authenticate = require('./../middleware/authenticate');

module.exports = (app) => {
  // Beta Testing Sign Up routes
  app.get('/accessCode', (req, res) => {
    res.render('accessCode.hbs', {
      pageTitle: 'Access'
    });
  });

  app.get('/signUp', authenticate.admin, (req, res) => {
    res.render('signUp.hbs', {
      pageTitle: 'Sign Up'
    });
  });

};
