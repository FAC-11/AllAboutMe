const { sign } = require('./passwordModule')();
const databaseQuery = require('../model/user_queries');
const { validateSignUp } = require('./validate');


exports.get = (req, res) => {
  res.render('signup', {
    activePage: {
      signup: true,
    },
    pageTitle: 'Signup',
  });
};


exports.post = (req, res) => {
  const userData = req.body;
  const validatedUser = validateSignUp(userData);
  console.log('validatedUser: ', validatedUser);
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
        if (existingUser.length == 0) {
          const hashedPassword = sign(userData.password);
          databaseQuery.addUser(userData.name, userData.email, hashedPassword)
            .then(() => {
              req.session.user = userData.name;
              res.redirect('home');
            })
            .catch((err) => {
              console.log('err', err);
              res.status(500).render('error', {
                layout: 'error',
                statusCode: 500,
                errorMessage: 'Internal server error',
              });
            });
        } else {
          // email already in database
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
