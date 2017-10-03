'use strict';
const crypto = require('crypto');
const env = require('env2')('config.env');

module.exports = () => {
  const secret = process.env.SECRET;
  if (!secret || typeof secret !== 'string') {
    throw Error('invalid secret!');
  }
  const functions = {
    sign: (value) => {
      const hmac = crypto.createHmac('sha256', secret);
      return hmac.update(value).digest('hex');
    },
    validate: (value, hash) => {
      if (functions.sign(value) !== hash) {
        return false;
      } else {
        return true;
      }
    }
  };
  return functions;
}
