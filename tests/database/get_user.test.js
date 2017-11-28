const test = require('tape');
const dbReset = require('../../src/model/database/db_seed');
const dbConnection = require('../../src/model/database/db_connection');

const { getUser } = require('../../src/model/user_queries');

test('Get user from database', (t) => {
  const expected = {
    id: 1,
    name: 'jam',
    email: 'jam@gmail.com',
    password: '$2a$10$18rlZExmWYQMnN2nWkd69eMlA/hUDCcj7DcrI./MllCOUYcDYiwlK',
  };

  dbReset()
    .then(() => getUser('jam@gmail.com'))
    .then((obj) => {
      t.deepEqual(obj, expected, 'Returns correct object');
      t.end();
    });
});
