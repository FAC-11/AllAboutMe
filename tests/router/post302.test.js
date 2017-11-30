const test = require('tape');
const request = require('supertest');
const app = require('../../src/app');
const dbReset = require('../../src/model/database/db_seed');

test('Forgot route post with invalid email', t => {
  request(app)
    .post('/forgot')
    .type('form')
    .send({ email: 'tom-cruise@gmail.com' })
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      t.equal(
        res.statusCode,
        302,
        'Status code should be 302 for invalid email'
      );
      t.error(err, 'No error when entering invalid email in fogot page');
      t.end();
    });
});
test('Login route when logging with wrong password is NOT successful', t => {
  dbReset().then(() => {
    request(app)
      .post('/login')
      .type('form')
      .send({ email: 'jam@gmail.com', password: 'passwsord' })
      .expect('Found. Redirecting to login')
      .expect(302)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .end((err, res) => {
        t.error(err, 'No error');
        t.equal(res.statusCode, 302, 'Status code is 302 for redirecting');
        t.equal(
          res.header['location'],
          'login',
          'Should redirect to login page if password is incorrect'
        );
        t.end();
      });
  });
});
test('Login route when logging with correct password is successful', t => {
  dbReset().then(() => {
    request(app)
      .post('/login')
      .type('form')
      .send({ email: 'jam@gmail.com', password: 'password' })
      .expect('Found. Redirecting to home')
      .expect(302)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .end((err, res) => {
        t.error(err, 'No error');
        t.equal(res.statusCode, 302, 'Status code is 302 for redirecting');
        t.equal(
          res.header['location'],
          'home',
          'Should redirect to home page if password is correct'
        );
        t.end();
      });
  });
});
test('Login route when logging in is NOT successful because user hasn\t signed up', t => {
  request(app)
    .post('/login')
    .type('form')
    .send({ email: 'jonnycash@gmail.com', password: 'havenotsignedup' })
    .expect('Found. Redirecting to login')
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      t.equal(res.statusCode, 302, 'Status code should be 302 for redirecting');
      t.error(err, 'No error');
      t.equal(
        res.header['location'],
        'login',
        'Should redirect to login page if login is unsuccessful because user hasnt signed up'
      );
      t.end();
    });
});
test('Signup route when signup is successful', t => {
  request(app)
    .post('/signup')
    .type('form')
    .send({
      name: 'tom cruise',
      email: 'cruise@gmail.com',
      password: 'topguntopgun',
      confirmPassword: 'topguntopgun',
    })
    .expect('Found. Redirecting to info_page')
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      t.equal(res.statusCode, 302, 'Status code is 302 for redirecting');
      t.equal(
        res.header['location'],
        '/info_page',
        'Should redirect to info_page page if successfully logged in'
      );
      t.end();
    });
});
test('Signup route when signup is NOT successful -passwords dont match', t => {
  request(app)
    .post('/signup')
    .type('form')
    .send({
      name: 'tom cruise',
      email: 'cruise@gmail.com',
      password: 'topgun',
      confirmPassword: 'topguntopgun',
    })
    .expect('Found. Redirecting to signup')
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      t.equal(res.statusCode, 302, 'Status code is 302 for redirecting');
      t.error(err, 'No error');
      t.equal(
        res.header['location'],
        'signup',
        'Should redirect to signup page if not successfully logged in'
      );
      t.end();
    });
});
test('Signup route when signup is NOT successful - user has already signed up', t => {
  dbReset().then(() => {
    request(app)
      .post('/signup')
      .type('form')
      .expect(302)
      .send({
        name: 'jam',
        email: 'jam@gmail.com',
        password: 'password',
        confirmPassword: 'password',
      })
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .end((err, res) => {
        t.equal(res.statusCode, 302, 'Responds with a 200');
        t.error(err, 'No error');
        t.end();
      });
  });
});
