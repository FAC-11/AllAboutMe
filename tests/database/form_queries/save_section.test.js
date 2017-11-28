const test = require('tape');
const dbReset = require('../../../src/model/database/db_seed');
const { addUser } = require('../../../src/model/user_queries');
const { getSection, saveSection } = require('../../../src/model/form_queries');

test('Save section into database', (t) => {
  const inputAbout = {
    likes: 'terrapins',
    dislikes: 'nothing',
    strengths: 'being super duper',
    weaknesses: 'nothing!',
    uncomfortable: 'uncertainty',
    safe: 'bathing in jam',
  };

  const inputAppointment = {
    gender_preference: 'female',
    time_preference: 'am',
    parent_involvement: 'no',
    email: '',
    mobile: '12345678910',
    telephone: null,
    contact_preference: '{text,post}',
    concerns: 'i feel ill',
    hope: 'I want to get better',
  };

  const inputSymptoms = {
    diagnosis_options: '{depression}',
    diagnosis_other: 'OCD',
    diagnosis_agreement: 'yes',
    medication: 'dont remember',
    therapies_options: '{}',
    therapies_other: 'exercise',
    therapies_helpful: 'na',
    keep_well: 'sleeping',
  };

  const inputBackground = {
    background: 'things and things',
  };

  const inputAdditional = {
    additional_info: null,
  };
  let userId;

  dbReset()
    .then(() =>
      addUser('billy', 'billy@gmail.com', 'longpassword'))
    .then((id) => {
      userId = id;
      return saveSection(userId, 'about', inputAbout);
    })
    .then(() =>
      getSection(userId, 'about'))
    .then((data) => {
      t.deepEqual(data, inputAbout, 'Saves about section');
      return saveSection(userId, 'appointments', inputAppointment);
    })
    .then(() =>
      getSection(userId, 'appointments'))
    .then((data) => {
      t.deepEqual(data, inputAppointment, 'Saves appointment section');
      return saveSection(userId, 'symptoms', inputSymptoms);
    })
    .then(() =>
      getSection(userId, 'additional'))
    .then((data) => {
      t.deepEqual(data, inputAdditional, 'Saves additional section');
      return saveSection(userId, 'additional', inputAdditional);
    })
    .then(() =>
      getSection(userId, 'symptoms'))
    .then((data) => {
      t.deepEqual(data, inputSymptoms, 'Saves symptoms section');
      return saveSection(userId, 'background', inputBackground);
    })
    .then(() =>
      getSection(userId, 'background'))
    .then((data) => {
      t.deepEqual(data, inputBackground, 'Saves background section');
      t.end();
    });
});

test.onFinish(() => process.exit());
