const dbConnection = require('./database/db_connection');
const { insertGenerator, getGenerator } = require('./queryGenerator');


const getAboutMe = (userId) => {
  return dbConnection.one( getGenerator('aboutMe'), [userId]);
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
  const aboutMeArr = [userId, likes, dislikes, strengths, weaknesses, uncomfortable, safe];
  return dbConnection.one( insertGenerator('aboutMe'), aboutMeArr);
};

module.exports = { getAboutMe, saveAboutMe };
