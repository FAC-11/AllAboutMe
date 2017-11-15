'use strict';
const bcrypt = require('bcryptjs');

require('env2')('config.env');

const hashPassword = (password) => {
  return bcrypt.genSalt(10)
    .then((salt) => {
      return bcrypt.hash(password, salt);
    });
};

const comparePasswords = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePasswords,
};
