const test = require('tape');
const dbReset = require('../src/model/database/db_seed');
const dbConnection = require('../src/model/database/db_connection');

const { addUser, getUser } = require('../src/model/user_queries');
const { getSection, saveAboutMe, saveSymptoms, saveBackgrounds,
  saveAppointments, saveClosing } = require('../src/model/form_queries');

const { getGenerator, insertGenerator } = require('../src/model/queryGenerator');

test('Get user based on email', (t) => {
  dbReset()
    .then(() => {
      return getUser('jam@gmail.com');
    })
    .then(userObj => {
      const expected = {
        name: 'jam',
        email: 'jam@gmail.com',
        password: 'password',
      };
      Object.keys(expected).forEach(key => {
        t.equal(userObj[key], expected[key], `Returns object with same ${key}`);
      });
      t.end();
    });
});

test('queryGenerator', (t) => {

  const expected ='INSERT INTO about_me (user_id, likes, dislikes, strengths, weaknesses, uncomfortable, safe) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (user_id) DO UPDATE SET (likes, dislikes, strengths, weaknesses, uncomfortable, safe) = ($2, $3, $4, $5, $6, $7)';

  const actual = insertGenerator('about_me');

  t.equal (actual, expected, 'should return correct sql query');
  t.end();
});

test('getSection of the form', (t) => {
  dbReset()
    .then( () => {
      return getUser('jam@gmail.com');
    })
    .then((userObj) => {
      return getSection(userObj.id, 'about_me');
    })
    .then((aboutMeObj) => {
      const expected = {
        likes: 'choccies',
        dislikes: 'spinach',
        strengths: 'jam making',
        weaknesses: 'eating too much jam',
        uncomfortable: 'running out of jam',
        safe: 'bathing in jam',
      };
      Object.keys(expected).forEach(key => {
        t.equal(aboutMeObj[key], expected[key], `Returns object with same value for ${key}`);
      });
      t.end();
    });
});

test( 'saveAboutMe query', (t) => {
  let userId;
  const data = {
    likes: 'choccies and bicycles',
    dislikes: 'spinach but more kale',
    strengths: 'jam making and cycling',
    weaknesses: 'eating too much jam and getting fat',
    uncomfortable: 'running out of jam, when people talk to me',
    safe: 'bathing in jam, rainbows',
  };
  dbReset()
    .then(() => {
      return getUser('jam@gmail.com');
    })
    .then((userObj) => {
      userId = userObj.id;
      return saveAboutMe(userId, data);
    })
    .then(() => {
      return getSection(userId, 'about_me');
    })
    .then((aboutMeObj) => {
      const expected = data;
      Object.keys(expected).forEach(key => {
        t.equal(aboutMeObj[key], expected[key], `Inserts correct value for ${key}`);
      });
      t.end();
    });
});

test.onFinish(() => process.exit());
