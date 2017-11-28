const test = require('tape');
const dbConnection = require('../../src/model/database/db_connection');
const dbReset = require('../../src/model/database/db_seed');
const { addUser } = require('../../src/model/user_queries');

test('Insert user into database', (t) => {
  dbReset()
    .then(() =>
      addUser('jam', 'jam1@gmail.com', 'password'))
    .then((id) => {
      t.equal(typeof id, 'number', 'Returns a number (the user id)');
      return dbConnection.one('SELECT * FROM forms WHERE user_id = $1', [id]);
    })
    .then((formObj) => {
      t.equal(formObj.email, 'jam1@gmail.com', 'Also inserts email into forms table');
    })
    .then((formObj) => {
      t.equal(typeof formObj.user_id, 'number', 'Also inserts user_id into forms table');
      return addUser('jon', 'jam1@gmail.com', 'password');
    })
    .then(() => {
      t.fail('Returns rejected promise if user already exists');
    })
    .catch(() => {
      t.pass('Returns rejected promise if user already exists');
    })
    .then(() => {
      t.end();
    });
});

test.onFinish(() => process.exit());
