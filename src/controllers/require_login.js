const requireLogin = (req, res, next) => {
  if (!req.session.id) {
  // redirects user to login page

    req.session.destination = req.originalUrl;
    req.flash('error', 'Please login to continue');
    res.status(401).render('login', {
      pageTitle: 'Login',
    });
  } else {
    next('route');
  }
};

module.exports = requireLogin;