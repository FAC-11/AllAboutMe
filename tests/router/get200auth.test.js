const test = require('tape');
const request = require('supertest');
const app = require('../../src/app');
const dbReset = require('../../src/model/database/db_seed');

test('GET authenticated routes', t => {
  const authenticatedPages = [
    'about',
    'home',
    'symptoms',
    'appointments',
    'background',
    'progress',
    'info_page',
    'colour_scheme',
    'send',
    'finish',
    'additional_info',
  ];
  dbReset().then(() => {
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
            .get(`/${page}`)
            .set('Cookie', cookies)
            .expect(200)
            .end((err, res) => {
              t.equal(res.statusCode, 200, `${page} responds with 200`);
              t.ok(
                res.text.includes('All about me'),
                `${page} route renders ${
                  page
                } page, containing \'All about me\' text`
              );
              t.notok(res.redirect, `${page} doesn\t redirect`);
              t.error(err, 'No error');
            });
        });
      });
  });
});
