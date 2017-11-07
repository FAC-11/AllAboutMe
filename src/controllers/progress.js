exports.get = (req, res) => {
  res.render('progress', {
    errorMessages: req.flash('error'),
    successMessages: req.flash('success'),
    activePage: {progress: true},
    pageTitle: 'Your Progress',
    logoutButton: true,
  });
}
