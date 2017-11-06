const test = require('tape');
const { generateToken } = require('../src/controllers/helpers');

test('generateToken', (t) => {
  const actual = generateToken();
  const actual2 = generateToken();
  t.equal(actual.length, 36, 'Returns token with 36 characters length');
  t.notEqual(actual, actual2, 'Doesn\'t always return the same token');
  t.end();
});
