const dbConnection = require('./database/db_connection');
const {insertGenerator, getGenerator} = require('./queryGenerator');

const getSection = (userId, sectionName) => {
  return dbConnection.one(getGenerator(sectionName), [userId]);
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
  const aboutMeArr = [
    userId,
    likes,
    dislikes,
    strengths,
    weaknesses,
    uncomfortable,
    safe,
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
    keep_well,
  } = symptomsData;

  const symptomsArr = [
    userId,
    diagnosis,
    diagnosis_agreement,
    current_medication,
    therapies,
    therapies_helpful,
    keep_well,
  ];
  return dbConnection.none(insertGenerator('symptoms'), symptomsArr);
};

const saveBackgrounds = (userId, backgroundsData) => {
  const { background } = backgroundsData;
  const backgroundsArr = [userId, background];
  return dbConnection.none(insertGenerator('backgrounds'), backgroundsArr);
};

const saveAppointments = (userId, appointmentsData) => {
  const {
    worker_preferences,
    appointment_preferences,
    parent_involved,
    email,
    mobile,
    telephone,
    contact_preference,
  } = appointmentsData;

  const appointmentsArr = [
    userId,
    worker_preferences,
    appointment_preferences,
    parent_involved,
    email,
    mobile,
    telephone,
    contact_preference,
  ];
  return dbConnection.none(insertGenerator('appointments'), appointmentsArr);
};

const saveClosing = (userId, closingData) => {
  const { concerns, hope } = closingData;
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
};
