const dbConnection = require('./database/db_connection');

const queries = {
  insertUser: 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
  getUser: 'SELECT * FROM users WHERE email = $1',
  userIdIntoForm: 'INSERT INTO forms (user_id) VALUES ($1) RETURNING user_id',
};

const addUser = (name, email, password) => {
  return dbConnection.one(queries.insertUser, [name, email, password])
    .then(userObj => {
      return dbConnection.one(queries.userIdIntoForm, [userObj.id]);
    })
    .then(obj => {
      return obj.user_id;
    });
};

const getUser = (email) => {
  return dbConnection.oneOrNone(queries.getUser, [email]);
};

module.exports = { addUser, getUser };
