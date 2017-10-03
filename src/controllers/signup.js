const { sign } = require('./passwordModule')();
const databaseQuery = require('../model/db_queries');
const { validateSignUp } = require('./validate');

exports.get = (req, res) => {
  res.render('signup', {
    activePage: {
      signup: true,
    },
    pageTitle: 'sign-up',
  });
};


exports.post = (req, res) => {
  const userData = req.body;
  const validatedUser = validateSignUp(userData);
  if (!validatedUser.isValid) {
    res.status(400).render('signup', {
      pageTitle: 'Signup',
      messages: [{
        content: validatedUser.message,
        error: true,
      }],
      userData,
    });
  } else {
    databaseQuery.getUser(userData.email)
      .then((existingUser) => {
        if (!existingUser) {
          const hashedPassword = sign(userData.password);
          databaseQuery.addUser(userData.nam, userData.email, hashedPassword)
            .then(() => {
              res.redirect('home');
            })
            .catch((err) => {
              res.status(500).render('error', {
                layout: 'error',
                statusCode: 500,
                errorMessage: 'Internal server error',
              });
            });
        } else {
          // email already in databse
          res.status(400).render('signup', {
            pageTitle: 'Signup',
            messages: [{
              content: `Account already exists for ${userData.email}`,
              error: true,
            }],
            userData,
          });
        }
      })
      .catch((err) => {
        res.status(500).render('error', {
          layout: 'error',
          statusCode: 500,
          errorMessage: 'Internal server error',
        });
      });
  }
};
