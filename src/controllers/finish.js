exports.get = (req, res) => {
  res.render('finish', {
    errorMessages: req.flash('error'),
    successMessages: req.flash('success'),
    activePage: {
      finish: true,
    },
    logoutButton: true,
  });
};
