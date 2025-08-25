const bcryptjs = require('bcryptjs');
// If need performance,
//   uncomment next line, install bcrypt package and check Dockerfile.
// const bcrypt = require('bcrypt');

const crypt = bcryptjs;

module.exports = crypt;