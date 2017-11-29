const {saveSection, getSection} = require('../model/form_queries');

exports.get = (req, res, next) => {
  getSection(req.session.id, 'background').then((data) => {
    res.render('background', {
      activePage: {
        background: true
      },
      errorMessages: req.flash('error'),
      successMessages: req.flash('success'),
      pageTitle: 'Your background',
      logoutButton: true,
      progressPercentage: '70',
      data
    });
  }).catch((err) => {
    next(err);
  });
};

exports.post = (req, res, next) => {
  saveSection(req.session.id, 'background', req.body).then(() => {
    const buttonPressed = req.body.button;
    if (buttonPressed === 'next') {
      res.redirect('additional_info');
    } else if (buttonPressed === 'previous') {
      res.redirect('about');
    } else {
      res.redirect('background');
    }
  }).catch((err) => {
    next(err);
  });
};
