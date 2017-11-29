const { saveSection, getSection } = require('../model/form_queries');

exports.get = (req, res, next) => {
  getSection(req.session.id, 'about')
    .then((data) => {
      res.render('about', {
        activePage: { about: true },
        errorMessages: req.flash('error'),
        successMessages: req.flash('success'),
        pageTitle: 'About Me',
        logoutButton: true,
        progressPercentage: '50',
        data,
        firstPage: false,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.post = (req, res, next) => {
  saveSection(req.session.id, 'about', req.body)
    .then(() => {
      const buttonPressed = req.body.button;
      if (buttonPressed === 'next') {
        res.redirect('background');
      } else if (buttonPressed === 'previous') {
        res.redirect('symptoms');
      } else {
        res.redirect('about');
      }
    })
    .catch((err) => {
      next(err);
    });

};
