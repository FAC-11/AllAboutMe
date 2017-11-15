const test = require('tape');
const request = require('supertest');
const app = require('../src/app');
const dbReset = require('../src/model/database/db_seed');

test('Login route loading (when not signed in)', t => {
  request(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      t.equal(res.statusCode, 200, 'Status code is 200');
      t.error(err, 'No error');
      t.ok(res.text.includes('Login'), 'Login route responds with page containing \'Login\' text');
      t.ok(res.text.includes('All about me'), 'Login route responds with page containing title \'All about me\' text');
      t.end();
    });
});
test('Sign Up route loading (when not signed in)', t => {
  request(app)
    .get('/signup')
    .expect(200)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      t.equal(res.statusCode, 200, 'Status code is 200');
      t.error(err, 'No error');
      t.ok(res.text.includes('Create an Account'), 'Signup route responds with page containing title \'Create an Account\' text');
      t.end();
    });
});
test('Forgot route', t => {
  request(app)
    .get('/forgot')
    .expect(200)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      t.equal(res.statusCode, 200, 'Status code is 200');
      t.error(err, 'No error');
      t.ok(res.text.includes('Forgotten password'), 'Forgot route responds with page containing title \'Forgotten password\' text');
      t.end();
    });
});
test('Reset password route with an expired token', t => {
  request(app)
    .get('/reset/509abfd5-0000-8ebb-c52f-afacca822733')
    .expect(302)
    .expect('Location', '/forgot')
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      t.equal(res.header['location'], '/forgot', 'Should redirect to forgot');
      t.equal(res.statusCode, 302, 'Status code is 302 because it redirects to forgot page');
      t.error(err, 'No error');
      t.end();
    });
});
test('Login route when logging with wrong password is NOT successful', t => {
  dbReset()
    .then(() => {
      request(app)
        .post('/login')
        .type('form')
        .send({'email': 'jam@gmail.com', 'password': 'passwsord'})
        .expect('Found. Redirecting to login')
        .expect(302)
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .end((err, res) => {
          t.equal(res.statusCode, 302, 'Status code is 302 for redirecting');
          t.equal(res.header['location'], 'login', 'Should redirect to login page if password is incorrect');
          t.end();
        });
    });
});
test('Login route when logging with correct password is successful', t => {
  dbReset()
    .then(() => {
      request(app)
        .post('/login')
        .type('form')
        .send({'email': 'jam@gmail.com', 'password': 'password'})
        .expect('Found. Redirecting to home')
        .expect(302)
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .end((err, res) => {
          t.equal(res.statusCode, 302, 'Status code is 302 for redirecting');
          t.equal(res.header['location'], 'home', 'Should redirect to home page if password is correct');
          t.end();
        });
    });
});
test('GET authenticated routes', (t) => {
  const authenticatedPages = [
    'about',
    'home',
    'symptoms',
    'appointments',
    'background',
    'progress',
  ];
  t.plan(authenticatedPages.length*3);
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
          .get(`\\${page}`)
          .set('Cookie', cookies)
          .expect(200)
          .end((err, res) => {
            t.equal(res.statusCode, 200, `${page} responds with 200`);
            t.notok(res.redirect, `${page} doesn\t redirect`);
            t.error(err, 'No error');
          });
      });
    });
});

test('POST authenticated routes (form sections)', (t) => {
  const authenticatedPages = [
    'about',
    'appointments',
    'background',
    'symptoms',
  ];
  t.plan(authenticatedPages.length*3);
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
          .post(`\\${page}`)
          .set('Cookie', cookies)
          .expect(302)
          .end((err, res) => {
            t.equal(res.statusCode, 302, `${page} responds with 302 (redirects)`);
            t.ok(res.redirect, `${page} redirects`);
            t.error(err, 'No error');
          });
      });
    });
});

test('Login route when logging in is NOT successful because user hasn\t signed up', t => {
  request(app)
    .post('/login')
    .type('form')
    .send({'email': 'jonnycash@gmail.com', 'password': 'havenotsignedup'})
    .expect('Found. Redirecting to login')
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      t.equal(res.statusCode, 302, 'Status code should be 302 for redirecting');
      t.error(err, 'No error');
      t.equal(res.header['location'], 'login', 'Should redirect to login page if login is unsuccessful because user hasnt signed up');
      t.end();
    });
});
test('Signup route when signup is successful', t => {
  request(app)
    .post('/signup')
    .type('form')
    .send({'name': 'tom cruise', 'email': 'cruise@gmail.com', 'password': 'topguntopgun', 'confirmPassword': 'topguntopgun' })
    .expect('Found. Redirecting to info-page')
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      t.equal(res.statusCode, 302, 'Status code is 302 for redirecting');
      t.equal(res.header['location'], '/info-page', 'Should redirect to info-page page if successfully logged in');
      t.end();
    });
});
test('Signup route when signup is NOT successful -passwords dont match', t => {
  request(app)
    .post('/signup')
    .type('form')
    .send({'name': 'tom cruise', 'email': 'cruise@gmail.com', 'password': 'topgun', 'confirmPassword': 'topguntopgun' })
    .expect('Found. Redirecting to signup')
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      t.equal(res.statusCode, 302, 'Status code is 302 for redirecting');
      t.error(err, 'No error');
      t.equal(res.header['location'], 'signup', 'Should redirect to signup page if not successfully logged in');
      t.end();
    });
});
test('Restricted routes should respond with 401 when signed out', t => {
  const routes = ['/home', '/info_page', '/about', '/symptoms', '/appointments', '/background', '/colour_scheme', '/send', '/progress', '/finish'];
  t.plan(30);
  routes.forEach( (route) => {
    request(app)
      .get(route)
      .expect(401)
      .expect('Content-Type', /text\/html/)
      .end((err, res) => {
        t.equal(res.statusCode, 401, `${route} should respond with a 401 status code when not logged in`);
        t.error(err, 'No error');
        t.ok(res.text.includes('Login'), `${route} route redirects to login page, containing \'Login\' text`);
     });
  });
});
test('Signup route when signup is NOT successful - user has already signed up', t => {
  dbReset()
    .then(() => {
      request(app)
        .post('/signup')
        .type('form')
        .expect(200)
        .send({'name': 'jam', 'email': 'jam@gmail.com', 'password': 'password', 'confirmPassword': 'password' })
        .expect('Content-Type', /text\/html/)
        .end((err, res) => {
          t.equal(res.statusCode, 200, 'Responds with a 200');
          t.error(err, 'No error');
          t.end();
        });
    });
});
