const dbConnection = require('./database/db_connection');

const userQueries = {
  insert: 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
  get: 'SELECT * FROM users WHERE email = $1',
};

const tables = ['about_me', 'symptoms', 'backgrounds', 'appointments', 'closing'];

// The function below is a nested query, which adds the new user in the users table and then
// when that is done, it adds the user_id in the other tables. This is where the mapping is used.

const addUser = (name, email, password) => {
  return dbConnection.one(userQueries.insert, [name, email, password])
    .then( obj =>  {
      const queryPromises = tables.map( table => {
        const query = `INSERT INTO ${table} (user_id) VALUES ($1) RETURNING user_id`;
        return dbConnection.one(query, [obj.id]);
      })
      return Promise.all(queryPromises);
    })
};

const getUser = (email) => {
  return dbConnection.one(userQueries.get, email)
};

module.exports = { addUser, getUser };
