const test = require('tape');
const request = require('supertest');
const app = require('../../src/app');

test('Unknown route', t => {
  request(app)
    .get('/nwonknu')
    .expect(404)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      t.equal(res.statusCode, 404, 'Status code is 404');
      t.error(err, 'No error');
      t.ok(res.text.includes('Sorry! This page couldn&#x27;t be found.'), 'Unknown route responds with page containing \'Sorry! This page couldn&#x27;t be found.\' text');
      t.end();
    });
});
