const test = require('tape');
const request = require('supertest');
const app = require('../../src/app');

test('Reset password route with an expired token', t => {
  request(app)
    .get('/reset/509abfd5-0000-8ebb-c52f-afacca822733')
    .expect(302)
    .expect('Location', '/forgot')
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      t.equal(res.header['location'], '/forgot', 'Should redirect to forgot');
      t.equal(
        res.statusCode,
        302,
        'Status code is 302 because it redirects to forgot page'
      );
      t.error(err, 'No error');
      t.end();
    });
});
