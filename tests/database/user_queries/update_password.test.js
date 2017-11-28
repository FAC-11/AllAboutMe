const test = require('tape');
const dbReset = require('../../../src/model/database/db_seed');
const { getUser, updatePassword } = require('../../../src/model/user_queries');

test('Update password', (t) => {
  const expected = 'ilovepasswords';
  dbReset()
    .then(() => updatePassword('ilovepasswords', 'jam@gmail.com'))
    .then(() => getUser('jam@gmail.com'))
    .then((data) => {
      t.equal(data.password, expected, 'Password should be updated and hashed correctly');
      t.end();
    });
});

test.onFinish(() => process.exit());
