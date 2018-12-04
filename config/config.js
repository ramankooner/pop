var env = process.env.NODE_ENV || 'development';

process.env['ENV'] = env;

if(process.env.NODE_ENV === 'development') {
  module.exports = {
    COMPANY_EMAIL: process.env.COMPANY_EMAIL,
    COMPANY_PASSWORD: process.env.COMPANY_PASSWORD
  }
}
