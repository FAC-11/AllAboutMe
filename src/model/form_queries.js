const dbConnection = require('./database/db_connection');

const fields = {
  about: [
    'likes',
    'dislikes',
    'strengths',
    'weaknesses',
    'uncomfortable',
    'safe',
  ],
  appointment: [
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

const getSectionValues = (section, data) => fields[section].map(field => data[field]);

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

module.exports = {
  getSection,
  getForm,
  saveSection,
};
