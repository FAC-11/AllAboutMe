const test = require('tape');
const request = require('supertest');
const app = require('../src/app');

test('Home route (when not signed in)', t => {
  request(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      t.equal(res.statusCode, 200, 'Status code is 200');
      t.error(err, 'No error');
      t.ok(res.text.includes('Login'), 'Home route responds with page containing \'Login\' text');
      t.ok(res.text.includes('All about me'), 'Home route responds with page containing title \'All about me\' text');
      t.end();
    });
});
