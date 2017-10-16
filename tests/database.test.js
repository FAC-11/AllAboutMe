const test = require('tape');
const dbReset = require('../src/model/database/db_seed');
const dbConnection = require('../src/model/database/db_connection');

const { addUser, getUser } = require('../src/model/user_queries');
const { getSection, saveAboutMe, saveSymptoms, saveBackgrounds,
  saveAppointments, saveClosing } = require('../src/model/form_queries');

const { getGenerator, insertGenerator } = require('../src/model/queryGenerator');

test('Insert user into database', (t) => {
  dbReset()
    .then(() => addUser('jam', 'jam1@gmail.com', 'password'))
    .then((id) => {
      t.equal(typeof id, 'number', 'Returns a number (the user id)');
      return addUser('jon', 'jam1@gmail.com', 'password');
    })
    .then(() => {
      t.fail('Returns rejected promise if user already exists');
    })
    .catch(() => {
      t.pass('Returns rejected promise if user already exists');
    })
    .then(() => {
      t.end();
    });
});

test('Get section from database', (t) => {
  const expectedAbout = {
    likes: 'choccies',
    dislikes: 'rain and thunder',
    strengths: 'being super duper',
    weaknesses: 'nothing!',
    uncomfortable: 'uncertainty',
    safe: 'bathing in jam',
  };

  const expectedAppointment = {
    gender_preference: 'male',
    time_preference: 'am',
    parent_involvement: 'no',
    email: '',
    mobile: '091290382904',
    telephone: null,
    contact_preference: '{text,email}',
    concerns: null,
    hope: null,
  };

  const expectedSymptoms = {
    diagnosis_options: '{schizophrenia,depression}',
    diagnosis_other: null,
    diagnosis_agreement: 'no',
    medication: 'none',
    therapies_options: '{talking therapies}',
    therapies_other: null,
    therapies_helpful: null,
    keep_well: 'running',
  };

  const expectedBackground = {
    background: 'i went for a walk when i was born',
  };

  dbReset()
    .then(() => getSection(1, 'about'))
    .then((data) => {
      t.deepEqual(data, expectedAbout, 'Returns correct data for about section');
      return getSection(1, 'appointment');
    })
    .then((data) => {
      t.deepEqual(data, expectedAppointment, 'Returns correct data for appointment section');
      return getSection(1, 'background');
    })
    .then((data) => {
      t.deepEqual(data, expectedBackground, 'Returns correct data for background section');
      return getSection(1, 'symptoms');
    })
    .then((data) => {
      t.deepEqual(data, expectedSymptoms, 'Returns correct data for symptoms section');
    })
    .catch((err) => {
      console.error(err);
    })
    .then(() => {
      t.end();
    });
});

test('Save section into database', (t) => {
  const inputAbout = {
    likes: 'terrapins',
    dislikes: 'nothing',
    strengths: 'being super duper',
    weaknesses: 'nothing!',
    uncomfortable: 'uncertainty',
    safe: 'bathing in jam',
  };

test.onFinish(() => process.exit());
