const test = require('tape');
const request = require('supertest');
const app = require('../../src/app');
const dbReset = require('../../src/model/database/db_seed');

test('Login route loading (when not signed in)', t => {
  request(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      t.equal(res.statusCode, 200, 'Status code is 200');
      t.error(err, 'No error');
      t.ok(res.text.includes('Login'), 'Login route responds with page containing \'Login\' text');
      t.ok(res.text.includes('All about me'), 'Login route responds with page containing title \'All about me\' text');
      t.end();
    });
});
test('Sign Up route loading (when not signed in)', t => {
  request(app)
    .get('/signup')
    .expect(200)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      t.equal(res.statusCode, 200, 'Status code is 200');
      t.error(err, 'No error');
      t.ok(res.text.includes('Create an Account'), 'Signup route responds with page containing title \'Create an Account\' text');
      t.end();
    });
});
test('Forgot route get', t => {
  request(app)
    .get('/forgot')
    .expect(200)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      t.equal(res.statusCode, 200, 'Status code is 200');
      t.error(err, 'No error');
      t.ok(res.text.includes('Forgotten password'), 'Forgot route responds with page containing title \'Forgotten password\' text');
      t.end();
    });
});
