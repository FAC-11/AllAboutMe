const test = require('tape');
const dbReset = require('../src/model/database/db_build');
const dbConnection = require('../src/model/database/db_connection');

const { addUser, getUser } = require('../src/model/db_queries');

test('Insert user into database', (t) => {
  dbReset()
    .then(() => {
      return addUser('jam', 'jam@gmail.com', 'password');
    })
    .then(id => {
      t.equal(typeof id, 'number', 'Returns an object containing user\'s id');
      t.end();
    });
});
