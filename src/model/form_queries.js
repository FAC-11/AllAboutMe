const dbConnection = require('./database/db_connection');

const aboutMeQueries = {
  get: 'SELECT * FROM about_me WHERE user_id = $1',
  update: 'INSERT INTO about_me (user_id, likes, dislikes, strengths, weaknesses, uncomfortable, safe) VALUES ($7, $1, $2, $3, $4, $5, $6) ON CONFLICT (user_id) DO UPDATE SET (likes, dislikes, strengths, weaknesses, uncomfortable, safe) = ($1, $2, $3, $4, $5, $6)',
};

const getAboutMe = (userId) => {
  return dbConnection.one(aboutMeQueries.get, [userId]);
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
  return dbConnection.one(aboutMeQueries.update, aboutMeArr);
};

module.exports = { getAboutMe, saveAboutMe };
