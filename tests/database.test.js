const test = require('tape');
const dbReset = require('../src/model/database/db_seed');
const dbConnection = require('../src/model/database/db_connection');

const { addUser, getUser, updatePassword } = require('../src/model/user_queries');
const { getSection, saveSection, getForm } = require('../src/model/form_queries');

test('Insert user into database', (t) => {
  dbReset()
    .then(() =>
      addUser('jam', 'jam1@gmail.com', 'password'))
    .then((id) => {
      t.equal(typeof id, 'number', 'Returns a number (the user id)');
      return dbConnection.one('SELECT * FROM forms WHERE user_id = $1', [id]);
    })
    .then((formObj) => {
      t.equal(formObj.email, 'jam1@gmail.com', 'Also inserts email into forms table');
    })
    .then((formObj) => {
      t.equal(typeof formObj.user_id, 'number', 'Also inserts user_id into forms table');
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

test('Get user from database', (t) => {
  const expected = {
    id: 1,
    name: 'jam',
    email: 'jam@gmail.com',
    password: 'password',
  };

  dbReset()
    .then(() => getUser('jam@gmail.com'))
    .then((obj) => {
      t.deepEqual(obj, expected, 'Returns correct object');
      t.end();
    });
});

test('Update password', (t) => {
  const expected = 'ilovepasswords';
  dbReset()
    .then(() => updatePassword('ilovepasswords', 'jam@gmail.com'))
    .then(() => getUser('jam@gmail.com'))
    .then((data) => {
      t.equal(data.password, expected, 'Password should be updated and hashed correctly');
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

test('Get form from database', (t) => {
  // TODO hardcoding id may be brittle
  const expected = {
    id: 1,
    user_id: 1,
    likes: 'choccies',
    dislikes: 'rain and thunder',
    strengths: 'being super duper',
    weaknesses: 'nothing!',
    uncomfortable: 'uncertainty',
    safe: 'bathing in jam',
    gender_preference: 'male',
    time_preference: 'am',
    parent_involvement: 'no',
    email: '',
    mobile: '091290382904',
    telephone: null,
    contact_preference: '{text,email}',
    concerns: null,
    hope: null,
    diagnosis_options: '{schizophrenia,depression}',
    diagnosis_other: null,
    diagnosis_agreement: 'no',
    medication: 'none',
    therapies_options: '{talking therapies}',
    therapies_other: null,
    therapies_helpful: null,
    keep_well: 'running',
    background: 'i went for a walk when i was born',
  };

  dbReset()
    .then(() =>
      getForm(1))
    .then((formObj) => {
      t.deepEqual(formObj, expected, 'Returns correct object');
      t.end();
    });
});

test.onFinish(() => process.exit());
