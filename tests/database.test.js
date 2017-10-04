const test = require('tape');
const dbReset = require('../src/model/database/db_seed');
const dbConnection = require('../src/model/database/db_connection');

const { addUser, getUser } = require('../src/model/user_queries');
const { saveAboutMe } = require('../src/model/form_queries');

test('Insert user into database', (t) => {
  dbReset()
    .then(() => {
      return addUser('jam', 'jam1@gmail.com', 'password');
    })
    .then((id) => {
      t.equal(typeof id, 'number', 'Returns a number (the user id)');
      t.end();
    });
});

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

//test('Insert about_me section into database', (t) => {
  //dbReset('db_build.sql')
    //.then(() => {
      //dbReset('db_seed.sql');
    //})
    //.then(() => {
      //const userData = {
        //name: 'bob',
        //email: 'bobdylan@gmail.com',
        //password: 'supersecurepassword',
      //};
      //return addUser(userData);
    //})
    //.then(userId => {
      //const aboutMeData = {
        //user_id: userId,
        //likes: 'bananas',
        //dislikes: 'dogs',
        //strengths: 'harmonica',
        //weaknesses: 'swimming',
      //};
      //return saveAboutMe(aboutMeData);
    //})
    //.then(() => {
      
    //})
    //.then((actual) => {
      //const expected = {
        //likes: 'bananas',
        //dislikes: 'dogs',
        //strengths: 'harmonica',
        //weaknesses: 'swimming',
      //};
      //Object.keys(expected).forEach(key => {
        //t.equal(actual[key], expected[key], `
      //});
      //t.end();
    //});
//});
