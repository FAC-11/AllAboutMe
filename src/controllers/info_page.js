exports.get = (req, res) => {
  res.render('info_page', {
    activePage: {info_page: true},
    logoutButton: true,
    pageTitle: 'Welcome!',
    name: req.session.user,
  });
};
