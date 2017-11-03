const { comparePasswords } = require('./passwordModule');
const { getUser } = require('../model/user_queries');

exports.get = (req, res) => {
  res.render('login', {
    activePage: {
      login: true,
    },
    pageTitle: 'Login',
    logoutButton: false,
  });
};

exports.post = (req, res) => {
  const userData = req.body;
  getUser(userData.email)
    .then((data) => {
      if (!data || !comparePasswords(userData.password, data.password)) {
        res.status(400).render('login', {
          pageTitle: 'Login',
          logoutButton: false,
          messages: [{
            content: 'Incorrect email or password',
            error: true,
          }],
        });
      } else {
        req.session.user = data.name;
        req.session.id = data.id;
        res.redirect('home');
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).render('error', {
        layout: 'error',
        statusCode: 500,
        errorMessage: 'Internal server error',
      });
    });
};
