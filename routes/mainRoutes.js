module.exports = (app) => {

  // Navigation Bar Routes
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
};
