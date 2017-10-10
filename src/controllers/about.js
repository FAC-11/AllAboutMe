const requireLogin = require('./requireLogin');

exports.get = (req, res) => {
  res.render('about', {
    activePage: { about: true },
    pageTitle: 'About Me',
  });
};
