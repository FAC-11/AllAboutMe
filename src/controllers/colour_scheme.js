exports.get = (req, res) => {
  res.render('colour_scheme', {
    activePage: {colour_scheme: true},
    pageTitle: 'Choose your colour!',
  });
}
