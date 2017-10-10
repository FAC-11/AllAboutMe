'use strict';
const crypto = require('crypto');
require('env2')('config.env');

const sign = (value) => {
  const secret = process.env.SECRET;
  if (!secret || typeof secret !== 'string') {
    throw Error('invalid secret!');
  }
  const hmac = crypto.createHmac('sha256', secret);
  return hmac.update(value).digest('hex');
};

const validatePassword = (value, hash) => {
  return sign(value) === hash;
};

module.exports = {
  sign,
  validatePassword,
};
