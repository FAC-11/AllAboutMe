const test = require('tape');
const request = require('supertest');
const app = require('../../src/app');

test('POST authenticated routes (form sections)', t => {
  const authenticatedPages = [
    'about',
    'appointments',
    'background',
    'symptoms',
    'additional_info',
  ];
  t.plan(authenticatedPages.length * 4);
  // First login to get cookie
  request(app)
    .post('/login')
    .type('form')
    .send({ email: 'jam@gmail.com', password: 'password' })
    .end((getCookieErr, loginRes) => {
      const cookies = loginRes.headers['set-cookie'];
      authenticatedPages.forEach(page => {
        // Then make requests to each authenticated route
        // setting cookie for each request
        request(app)
          .post(`/${page}`)
          .set('Cookie', cookies)
          .expect(302)
          .end((err, res) => {
            t.equal(
              res.statusCode,
              302,
              `${page} responds with 302 (redirects)`
            );
            t.ok(res.redirect, `${page} redirects`);
            t.equal(
              res.headers['location'],
              `${page}`,
              `should redirect to ${page} page for invalid email`
            );
            t.error(err, 'No error');
          });
      });
    });
});
test('POST send page with invalid email', t => {
  request(app)
    .post('/login')
    .type('form')
    .send({ email: 'jam@gmail.com', password: 'password' })
    .end((getCookieErr, loginRes) => {
      const cookies = loginRes.headers['set-cookie'];
      request(app)
        .post('/send')
        .set('Cookie', cookies)
        .send({ email: 'gmail.com' })
        .expect(302)
        .end((err, res) => {
          t.equal(
            res.statusCode,
            302,
            'Send page responds with 302 (redirects)'
          );
          t.ok(res.redirect, 'send page redirects for invalid email');
          t.equal(
            res.headers['location'],
            'send',
            'should redirect to send page for invalid email'
          );
          t.error(err, 'No error');
          t.end();
        });
    });
});
