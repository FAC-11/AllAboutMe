const dbConnection = require('./database/db_connection');

const formQueries = {
  get: 'SELECT * FROM about_me WHERE user_id = $1',
  update: 'UPDATE about_me SET (likes, dislikes, strengths, weaknesses, uncomfortable, safe) = ($1, $2, $3, $4, $5, $6) WHERE user_id=$7 RETURNING id',
};

const saveAboutMe = (userId, aboutMeData) => {
  const {
    likes,
    dislikes,
    strengths,
    weaknesses,
    uncomfortable,
    safe,
  } = aboutMeData;
  const aboutMeArr = [likes, dislikes, strengths, weaknesses, uncomfortable, safe, userId];
  return dbConnection.one(formQueries.update, aboutMeArr)
    .then(obj => obj.id);
};

module.exports = { saveAboutMe };
