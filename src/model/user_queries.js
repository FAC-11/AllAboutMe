const dbConnection = require('./database/db_connection');

const userQueries = {
  insert: 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
  get: 'SELECT * FROM users WHERE email = $1',
};

const addUser = (name, email, password) => {
  return dbConnection.one(userQueries.insert, [name, email, password])
    .then( obj =>  {
      return obj.id;
    });
};

const getUser = (email) => {
  return dbConnection.one(userQueries.get, email);
};

module.exports = { addUser, getUser };
