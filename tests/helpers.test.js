const test = require('tape');
const {generateToken} = require('../src/controllers/helpers/generate_token');
const {hashPassword, comparePasswords} = require('../src/controllers/helpers/passwordModule');

test('generateToken', (t) => {
  const actual = generateToken();
  const actual2 = generateToken();
  t.equal(actual.length, 36, 'Returns token with 36 characters length');
  t.notEqual(actual, actual2, 'Doesn\'t always return the same token');
  t.end();
});

test('hashPassword', (t) => {
  // '$2a$10$U8Guyxf4mzSJxOTzOHxgGu42iR64dCWnqsbKEJ0V5FVe2lGrHIxAi'
  const firsthash = hashPassword('password').then((hash) => {
    return hash;
  });
  hashPassword('password').then((actual) => {
    t.notEqual(actual, firsthash, 'Returns a different hash each time you call with same argument')
    t.equal(actual.length, 60, 'Hash password returns string of length 60 for any given argument')
    t.end();
  });
});
