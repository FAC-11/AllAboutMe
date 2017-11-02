exports.get = (req, res) => {
  res.render('home', {
    errorMessages: req.flash('error'),
    successMessages: req.flash('success'),
    activePage: { home: true },
    pageTitle: 'Home',
  });
};

