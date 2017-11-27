const requireLogin = (req, res, next) => {
  const authroutes = ['/home', '/info_page', '/about', '/symptoms', '/appointments', '/background', '/colour_scheme', '/send', '/progress', '/finish', '/additional_info'];

  if (authroutes.indexOf(req.url) !== -1 && !req.session.id) {
    // redirects user to login page
    req.session.destination = req.originalUrl;
    req.flash('error', 'Please login to continue');
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = requireLogin;
