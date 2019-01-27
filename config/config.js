if(process.env.NODE_ENV === 'development') {
  // Production Environment
  module.exports = require('./keys');
} else {
  // Development Environment
  module.exports = require('./prod');
}
