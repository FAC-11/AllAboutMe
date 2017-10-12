const test = require('tape');
const checkEmail = require('../src/controllers/check_email');
const finish = require('../src/controllers/finish');


// testing sendEmail function
test('checkEmail tests', (t) => {
  const input = 'jen@gmail.com';
  checkEmail(input);
  t.pass('it should not throw an error for a valid email address');
  t.end();
});


test.onFinish(() => process.exit());
