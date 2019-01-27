/* var env = process.env.NODE_ENV || 'development';

process.env['ENV'] = env;

if (process.env.NODE_ENV === 'production') {
  // Production Environment
  module.exports = require('./prod');
} else {
  // Development Environment
  module.exports = require('./keys');
}
*/
module.exports = require('./prod');
