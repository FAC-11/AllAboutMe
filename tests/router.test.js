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
  t.plan(30);
  request(app)
    .get('/home')
    .expect(401)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      t.equal(res.statusCode, 401, '/home');
      t.error(err, 'No error');
      t.ok(res.text.includes('Login'), 'Home route redirects to login page, containing \'Login\' text');
    });
  request(app)
    .get('/info_page')
    .expect(401)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      t.equal(res.statusCode, 401, '/info_page');
      t.error(err, 'No error');
      t.ok(res.text.includes('Login'), 'Info page route redirects to login page, containing \'Login\' text');
    });
  request(app)
    .get('/about')
    .expect(401)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      t.equal(res.statusCode, 401, '/about');
      t.error(err, 'No error');
      t.ok(res.text.includes('Login'), 'About route redirects to login page, containing \'Login\' text');
        });
  request(app)
    .get('/symptoms')
    .expect(401)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      t.equal(res.statusCode, 401, '/symptoms');
      t.error(err, 'No error');
      t.ok(res.text.includes('Login'), 'Symptoms route redirects to login page, containing \'Login\' text');
    });
  request(app)
    .get('/appointments')
    .expect(401)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      t.equal(res.statusCode, 401, '/appointments');
      t.error(err, 'No error');
      t.ok(res.text.includes('Login'), 'Appointments route redirects to login page, containing \'Login\' text');
    });
  request(app)
    .get('/background')
    .expect(401)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      t.equal(res.statusCode, 401, '/background');
      t.error(err, 'No error');
      t.ok(res.text.includes('Login'), 'Background route redirects to login page, containing \'Login\' text');
    });
  request(app)
    .get('/colour_scheme')
    .expect(401)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      t.equal(res.statusCode, 401, '/colour_scheme');
      t.error(err, 'No error');
      t.ok(res.text.includes('Login'), 'Colour scheme redirects to login page, containing \'Login\' text');
    });
  request(app)
    .get('/send')
    .expect(401)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
       t.equal(res.statusCode, 401, '/send');
       t.error(err, 'No error');
       t.ok(res.text.includes('Login'), 'Send route redirects to login page, containing \'Login\' text');
    });
  request(app)
    .get('/progress')
    .expect(401)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      t.equal(res.statusCode, 401, '/progress');
      t.error(err, 'No error');
      t.ok(res.text.includes('Login'), 'Progress route redirects to login page, containing \'Login\' text');
    });
  request(app)
    .get('/finish')
    .expect(401)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      t.equal(res.statusCode, 401, '/finish');
      t.error(err, 'No error');
      t.ok(res.text.includes('Login'), 'Finish route redirects to login page, containing \'Login\' text');
    });
});
