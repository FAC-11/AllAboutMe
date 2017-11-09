const dbConnection = require('./database/db_connection');

const queries = {
  insertUser: 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
  getUser: 'SELECT * FROM users WHERE email = $1',
  userIdIntoForm: 'INSERT INTO forms (user_id, email) VALUES ($1, $2) RETURNING user_id',
  updatePassword: 'UPDATE users SET password=$1 WHERE email=$2',
};

const addUser = (name, email, password) =>
  dbConnection.one(queries.insertUser, [name, email, password])
    .then(userObj => dbConnection.one(queries.userIdIntoForm, [userObj.id, email]))
    .then(obj => obj.user_id);

const getUser = email =>
  dbConnection.oneOrNone(queries.getUser, [email]);

const updatePassword = (password, email) =>
  dbConnection.none(queries.updatePassword, [password, email]);

module.exports = { addUser, getUser, updatePassword };
