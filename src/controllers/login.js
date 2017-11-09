const { comparePasswords } = require('./passwordModule');
const { getUser } = require('../model/user_queries');

exports.get = (req, res) => {
  res.render('login', {
    errorMessages: req.flash('error'),
    successMessages: req.flash('success'),
    activePage: {
      login: true,
    },
    pageTitle: 'Login',
    logoutButton: false,
  });
};

exports.post = (req, res) => {
  const inputData = req.body;
  getUser(inputData.email)
    .then((dbData) => {
      if (!dbData) {
        req.flash('error', 'Incorrect email or password');
        res.status(400).redirect('login');
      } else {
        return comparePasswords(inputData.password, dbData.password)
          .then((match) => {
            if (!match) {
              req.flash('error', 'Incorrect email or password');
              res.status(400).redirect('login');
            } else {
              req.session.user = dbData.name;
              req.session.id = dbData.id;
              res.redirect('home');
            }
          });
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
