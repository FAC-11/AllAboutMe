const test = require('tape');
const request = require('supertest');
const app = require('../../src/app');

test('POST LOGOUT authenticated routes (form sections)', (t) => {
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
      authenticatedPages.forEach((page) => {
        // Then make requests to each authenticated route
        // setting cookie for each request
        request(app)
          .post(`/${page}`)
          .set('Cookie', cookies)
          .expect(302)
          .end((error, resB) => {
            const locationBefore = resB.header['location'];
            t.equal(locationBefore, `${page}`, 'Current page is an authenticated route');

            request(app)
              .post('/logout')
              .type('form')
              .expect(302)
              .end((err, res) => {
                t.equal(res.statusCode, 302, 'Status code should be 302 for redirect');
                t.equal(res.header['location'], '/', 'Should redirect to /');
                t.notEqual(res.header['location'], locationBefore, 'Logout button redirects from any page to login');
              });
          });
      });
    });
});
test('POST LOGOUT authenticated routes', (t) => {
  const authenticatedPages = [
    'home',
    'progress',
    'info_page',
    'colour_scheme',
    'send',
    'finish',
  ];
  t.plan(authenticatedPages.length * 2);
  // First login to get cookie
  request(app)
    .post('/login')
    .type('form')
    .send({ email: 'jam@gmail.com', password: 'password' })
    .end((getCookieErr, loginRes) => {
      const cookies = loginRes.headers['set-cookie'];
      authenticatedPages.forEach((page) => {
        // Then make requests to each authenticated route
        // setting cookie for each request
        request(app)
          .get(`/${page}`)
          .set('Cookie', cookies)
          .expect(302)
          .end((error, resB) => {

            request(app)
              .post('/logout')
              .type('form')
              .expect(302)
              .end((err, res) => {
                t.equal(res.statusCode, 302, 'Status code should be 302 for redirect');
                t.equal(res.header['location'], '/', 'Should redirect to /');
              });
          });
      });
    });
});
