const requireLogin = (req, res, next) => {
  if (!req.session.id) {
    // redirects user to login page
    req.session.destination = req.originalUrl;
    req.flash('error', 'Please login to continue');
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = requireLogin;
