
const forbidden = require('./forbidden.error');
const internal = require('./internal.error');
const unauthorized = require('./unauthorized.error');

module.exports = {
  ...forbidden,
  ...internal,
  ...unauthorized,
}