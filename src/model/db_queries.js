const dbConnection = require('./database/db_connection');

const userQueries = {
  insert: 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
};

const addUser = (name, email, password) => {
  return dbConnection.one(userQueries.insert, [name, email, password])
    .then((obj) => {
      return obj.id;
    });
};

module.exports = { addUser };
