const { sign, validate } = require('./passwordModule')();
// validate not used, we could delete it
const databaseQuery = require('../model/user_queries');
const { validateLogin } = require('./validate');

exports.get = (req, res) => {
  res.render('login', {
    activePage: {
      login: true,
    },
    pageTitle: 'Login',
  });
};

exports.post = (req, res) => {
  const userData = req.body;
  const validatedLogin = validateLogin(userData);
  if (!validatedLogin.isValid) {
    res.status(400).render('login', {
      pageTitle: 'Login',
      messages: [
        {
          content: validatedLogin.message,
          error: true,
        },
      ],
      userData,
    });
  } else {
    databaseQuery.getUser(userData.email)
      .then((data) => {
        if (!data || sign(userData.password) !== data.password) {
          res.status(400).render('login', {
            pageTitle: 'Login',
            messages: [
              {
                content: 'Incorrect email or password',
                error: true,
              },
            ],
            userData,
          });
        } else {
          // if the login is successful
          req.session.user_id = userData.id;
          res.redirect(req.session.destination || 'home');
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
  }
};
