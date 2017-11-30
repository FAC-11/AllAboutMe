const { saveSection, getSection } = require('../model/form_queries');

exports.get = (req, res, next) => {
  getSection(req.session.id, 'additional').then((data) => {
    res.render('additional_info', {
      activePage: {
        additional_info: true,
      },
      errorMessages: req.flash('error'),
      successMessages: req.flash('success'),
      pageTitle: 'Additional Information',
      logoutButton: true,
      progressPercentage: '90',
      data,
    });
  }).catch((err) => {
    next(err);
  });
};

exports.post = (req, res, next) => {
  saveSection(req.session.id, 'additional', req.body).then(() => {
    const buttonPressed = req.body.button;
    if (buttonPressed === 'next') {
      res.redirect('send');
    } else if (buttonPressed === 'previous') {
      res.redirect('background');
    } else {
      res.redirect('additional_info');
    }
  }).catch((err) => {
    next(err);
  });
};
