exports.get = (req, res) => {
  res.render('appointments', {
    activePage: {appointments: true},
    pageTitle: 'Your appointment',
  });
}
