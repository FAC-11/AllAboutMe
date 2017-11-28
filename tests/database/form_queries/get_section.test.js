const test = require('tape');
const dbReset = require('../../../src/model/database/db_seed');
const { getSection } = require('../../../src/model/form_queries');

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

  const expectedAdditional = {
    additional_info: null,
  };

  dbReset()
    .then(() =>
      getSection(1, 'about'))
    .then((data) => {
      t.deepEqual(data, expectedAbout, 'Returns correct data for about section');
      return getSection(1, 'appointments');
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
      return getSection(1, 'additional');
    })
    .then((data) => {
      t.deepEqual(data, expectedAdditional, 'Returns correct data for additional info section');
    })
    .then(() => {
      t.end();
    });
});

test.onFinish(() => process.exit());
