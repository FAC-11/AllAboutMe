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
test('Restricted routes should respond with 401 when signed out', t => {
  t.plan(10);
  request(app)
    .get('/home')
    .expect(401)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      t.equal(res.statusCode, 401, '/home');
    });
  request(app)
    .get('/info_page')
    .expect(401)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
     t.equal(res.statusCode, 401, '/info_page');
    });
  request(app)
    .get('/about')
    .expect(401)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
    t.equal(res.statusCode, 401, '/about');
      });
  request(app)
    .get('/symptoms')
    .expect(401)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
    t.equal(res.statusCode, 401, '/symptoms');
    });
  request(app)
    .get('/appointments')
    .expect(401)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      t.equal(res.statusCode, 401, '/appointments');
    });
  request(app)
    .get('/background')
    .expect(401)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
    t.equal(res.statusCode, 401, '/background');
    });
  request(app)
    .get('/colour_scheme')
    .expect(401)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
    t.equal(res.statusCode, 401, '/colour_scheme');
    });
  request(app)
    .get('/send')
    .expect(401)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
     t.equal(res.statusCode, 401, '/send');
    });
  request(app)
    .get('/progress')
    .expect(401)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
    t.equal(res.statusCode, 401, '/progress');
    });
  request(app)
    .get('/finish')
    .expect(401)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
    t.equal(res.statusCode, 401, '/finish');
    });
});
