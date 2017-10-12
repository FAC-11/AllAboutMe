const dbConnection = require('./database/db_connection');
const {insertGenerator, getGenerator} = require('./queryGenerator');

const getSection = (userId, sectionName) => {
  return dbConnection.oneOrNone(getGenerator(sectionName), [userId]);
};

const getForm = (userId) => {
  const sections = ['about_me', 'symptoms', 'backgrounds', 'appointments', 'closing'];
  const promises = sections.map((sectionName) => {
    return getSection(userId, sectionName)
            .catch((error) => {
              return {
                message: sectionName + ': This section has not been completed'
              };
            });
          });
  return Promise.all(promises);
};

const saveAboutMe = (userId, aboutMeData) => {
  const {
    likes,
    dislikes,
    strengths,
    weaknesses,
    uncomfortable,
    safe
  } = aboutMeData;
  const aboutMeArr = [
    userId,
    likes,
    dislikes,
    strengths,
    weaknesses,
    uncomfortable,
    safe
  ];
  return dbConnection.none(insertGenerator('about_me'), aboutMeArr);
};

const saveSymptoms = (userId, symptomsData) => {
  const {
    diagnosis,
    diagnosis_agreement,
    current_medication,
    therapies,
    therapies_helpful,
    keep_well
  } = symptomsData;

  const symptomsArr = [
    userId,
    diagnosis,
    diagnosis_agreement,
    current_medication,
    therapies,
    therapies_helpful,
    keep_well
  ];
  return dbConnection.none(insertGenerator('symptoms'), symptomsArr);
};

const saveBackgrounds = (userId, backgroundsData) => {
  const {background} = backgroundsData;
  const backgroundsArr = [userId, background];
  return dbConnection.none(insertGenerator('backgrounds'), backgroundsArr);
};

const saveAppointments = (userId, appointmentsData) => {
  const {
    gender,
    time,
    parent,
    email,
    mobile,
    telephone,
    contact_preference
  } = appointmentsData;

  const appointmentsArr = [
    userId,
    gender,
    time,
    parent,
    email,
    mobile,
    telephone,
    contact_preference
  ];
  return dbConnection.none(insertGenerator('appointments'), appointmentsArr);
};

const saveClosing = (userId, closingData) => {
  const {concerns, hope} = closingData;
  const closingArr = [userId, concerns, hope];
  return dbConnection.none(insertGenerator('closing'), closingArr);
};

module.exports = {
  getSection,
  saveAboutMe,
  saveSymptoms,
  saveBackgrounds,
  saveAppointments,
  saveClosing,
  getForm
};
