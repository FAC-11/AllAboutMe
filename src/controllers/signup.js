const { hashPassword } = require('./passwordModule');
const { getUser, addUser } = require('../model/user_queries');
const { validateSignUp } = require('./validate');


exports.get = (req, res) => {
  res.render('signup', {
    errorMessages: req.flash('error'),
    successMessages: req.flash('success'),
    activePage: {
      signup: true,
    },
    pageTitle: 'Create an Account',
    logoutButton: false,
  });
};


exports.post = (req, res) => {
  const userData = req.body;
  const validatedUser = validateSignUp(userData);
  if (!validatedUser.isValid) {
    req.flash('error', validatedUser.message);
    res.redirect('signup');
  } else {
    getUser(userData.email)
      .then((existingUser) => {
        if (!existingUser) {
          hashPassword(userData.password)
            .then((hashedPassword) => {
              return addUser(userData.name, userData.email, hashedPassword);
            })
            .then((id) => {
              req.session.user = userData.name;
              req.session.id = id;
              res.redirect('/info-page');
            })
            .catch((err) => {
              console.log(err);
              res.status(500).render('error', {
                layout: 'error',
                statusCode: 500,
                errorMessage: 'Internal server error',
              });
            });
        } else {
          req.flash('error', `Account already exists for ${userData.email}`);
          res.redirect('signup');
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
