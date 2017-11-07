exports.get = (req, res) => {
  res.render('send', {
    errorMessages: req.flash('error'),
    successMessages: req.flash('success'),
    activePage: {
      send: true,
    },
    pageTitle: 'Send',
  });
};
