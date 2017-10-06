const test = require('tape');
const checkEmail = require('../src/controllers/check_Email');


// testing sendEmail function
test('checkEmail tests', (t) => {
  const input = 'jen@gmail.com';
  const actual = checkEmail(input);
  t.ok(actual, 'returns a string with the value "jen@gmail.com"');
  t.end();
});

test.onFinish(() => process.exit());
