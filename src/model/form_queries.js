const dbConnection = require('./database/db_connection');

const formQueries = {
  add: 'INSERT INTO about_me (user_id, likes, dislikes, \
    strengths, weaknesses, uncomfortable, safe) VALUES \
    ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
  get: 'SELECT * FROM about_me WHERE user_id = $1',
  update: 'UPDATE about_me SET (user_id, likes, dislikes, strengths, weaknesses, uncomfortable, safe) = ($1, $2, $3, $4, $5, $6, $7) WHERE user_id=$8'
};

const addAboutMe = (aboutMe) => {
  const {user_id, likes, dislikes, strengths, weaknesses, uncomfortable, safe} = aboutMe;
  return dbConnection.one(formQueries.add, [user_id, likes, dislikes, strengths, weaknesses, uncomfortable, safe])
    .then( obj => obj.id );
};
