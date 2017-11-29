const {hashPassword} = require('./helpers/password_module');
const {getUser, addUser} = require('../model/user_queries');
const {validateSignUp} = require('./helpers/validate');

exports.get = (req, res) => {
  res.render('signup', {
    errorMessages: req.flash('error'),
    successMessages: req.flash('success'),
    activePage: {
      signup: true
    },
    pageTitle: 'Create an Account',
    logoutButton: false
  });
};

exports.post = (req, res, next) => {
  const userData = req.body;
  const validatedUser = validateSignUp(userData);
  if (!validatedUser.isValid) {
    req.flash('error', validatedUser.message);
    res.redirect('signup');
  } else {
    getUser(userData.email).then((existingUser) => {
      if (!existingUser) {
        hashPassword(userData.password).then((hashedPassword) => {
          return addUser(userData.name, userData.email, hashedPassword);
        }).then((id) => {
          req.session.user = userData.name;
          req.session.id = id;
          res.redirect('/info_page');
        }).catch((err) => {
          next(err);
        });
      } else {
        req.flash('error', `Account already exists for ${userData.email}`);
        res.redirect('signup');
      }
    }).catch((err) => {
      next(err);
    });
  }
};
