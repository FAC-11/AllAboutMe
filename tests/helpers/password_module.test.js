const test = require('tape');
const {
  hashPassword,
  comparePasswords,
} = require('../../src/controllers/helpers/password_module');

test('hashPassword', t => {
  const firsthash = hashPassword('password');
  const actual = hashPassword('password');
  Promise.all([firsthash, actual]).then(values => {
    console.log(values);
    t.notEqual(
      values[0],
      values[1],
      'Returns a different hash each time you call with same argument'
    );
    t.equal(
      values[0].length,
      60,
      'Hash password returns string of length 60 for any given argument'
    );
    t.end();
  });
});
