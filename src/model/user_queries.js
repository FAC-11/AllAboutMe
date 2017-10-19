const dbConnection = require('./database/db_connection');

const userQueries = {
  insert: 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
  get: 'SELECT * FROM users WHERE email = $1',
};

const addUser = (name, email, password) => {
  return dbConnection.one(userQueries.insert, [name, email, password])
    .then(userObj => {
      return dbConnection.one('INSERT INTO forms (user_id) VALUES ($1) RETURNING user_id', [userObj.id]);
    })
    .then(obj => {
      return obj.user_id;
    });
};

const getUser = (email) => {
  return dbConnection.any(userQueries.get, [email])
    .then((result) => {
      return result[0];
    });
};

module.exports = { addUser, getUser };
