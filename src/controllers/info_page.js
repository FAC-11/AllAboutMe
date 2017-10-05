exports.get = (req, res) => {
  res.render('info_page', {
    activePage: {info_page: true},
    pageTitle: 'Welcome!',
  });
}
