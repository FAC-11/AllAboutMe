const dbConnection = require('./database/db_connection');

const fields = {
  about: [
    'likes',
    'dislikes',
    'strengths',
    'weaknesses',
    'uncomfortable',
    'safe',
    'likes_svg',
  ],
  appointments: [
    'gender_preference',
    'time_preference',
    'parent_involvement',
    'email',
    'mobile',
    'telephone',
    'contact_preference',
    'concerns',
    'hope',
  ],
  background: [
    'background',
  ],
  symptoms: [
    'diagnosis_options',
    'diagnosis_other',
    'diagnosis_agreement',
    'medication',
    'therapies_options',
    'therapies_other',
    'therapies_helpful',
    'keep_well',
  ],
};
const getSection = (userId, section) => {
  const query = `SELECT ${fields[section].join(', ')} FROM forms WHERE user_id = $1`;
  return dbConnection.oneOrNone(query, [userId]);
};

const getSectionValues = (section, data) =>
  fields[section].map(field =>
    data[field]);

const saveSection = (userId, section, data) => {
  const dollars = fields[section].map((item, index) => `$${(index + 1)}`);

  const query = `UPDATE forms SET (${fields[section].join(', ')})\
 = (${dollars.join(', ')}) WHERE user_id = $${fields[section].length + 1}`;

  return dbConnection.none(query, getSectionValues(section, data).concat(userId));
};

const getForm = (userId) => {
  const query = 'SELECT * FROM forms WHERE user_id = $1';
  return dbConnection.one(query, [userId]);
};

const saveDrawing = (userId, fieldName, data) => {
  const query = `UPDATE forms SET ${fieldName} = ($1) WHERE user_id = $2`;
  return dbConnection.none(query, [data, userId]);
};

const getDrawing = (userId, fieldName) => {
  const query = `SELECT ${fieldName} FROM forms WHERE user_id = $1`;
  return dbConnection.oneOrNone(query, [userId])
    .then(svgObj => svgObj[fieldName])
    .catch(console.log);
};

module.exports = {
  getSection,
  getForm,
  saveSection,
  saveDrawing,
  getDrawing,
};
