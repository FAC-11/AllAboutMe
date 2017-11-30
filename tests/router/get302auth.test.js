const test = require('tape');
const request = require('supertest');
const app = require('../../src/app');

test('Restricted routes should redirect to login when signed out', t => {
  const routes = [
    '/home',
    '/info_page',
    '/about',
    '/symptoms',
    '/appointments',
    '/background',
    '/colour_scheme',
    '/send',
    '/progress',
    '/finish',
    '/additional_info',
  ];
  t.plan(routes.length * 3);
  routes.forEach(route => {
    request(app)
      .get(route)
      .expect(302)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .end((err, res) => {
        t.equal(
          res.statusCode,
          302,
          `${route} should redirect to login with status code 302`
        );
        t.equal(res.header['location'], '/login', `Should redirect to login`);
        t.error(err, 'No error');
      });
  });
});
