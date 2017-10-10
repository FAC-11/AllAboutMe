const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
  // redirects user to login page
    req.session.destination = req.originalUrl;
    res.render('login', {
      pageTitle: 'Login',
      messages: [{ content: 'Please login to continue', error: true }],
    });
  } else {
    next('route');
  }
};

module.exports = requireLogin;
