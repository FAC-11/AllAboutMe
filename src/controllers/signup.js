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
  });
};


exports.post = (req, res) => {
  const userData = req.body;
  const validatedUser = validateSignUp(userData);
  if (!validatedUser.isValid) {
    req.flash('error', validatedUser.message);
    res.status(400).render('signup', {
      pageTitle: 'Create an Account',
    });
  } else {
    getUser(userData.email)
      .then((existingUser) => {
        if (!existingUser) {
          const hashedPassword = hashPassword(userData.password);
          addUser(userData.name, userData.email, hashedPassword)
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
          res.status(200).render('signup', {
            pageTitle: 'Create an Account',
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
  }
};
