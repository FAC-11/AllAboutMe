const { saveSection, getSection } = require('../model/form_queries');

exports.get = (req, res) => {
  getSection(req.session.id, 'additional')
    .then((data) => {
      res.render('additional_info', {
        activePage: { additional_info: true },
        errorMessages: req.flash('error'),
        successMessages: req.flash('success'),
        pageTitle: 'Additional Information',
        logoutButton: true,
        progressPercentage: '80',
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      req.flash('error', 'Sorry - we couldn\'t load your saved answers for this section');
      res.render('additional_info', {
        activePage: { additional_info: true },
        errorMessages: req.flash('error'),
        successMessages: req.flash('success'),
        pageTitle: 'Additional Information',
        progressPercentage: '80%',
        logoutButton: true,
      });
    });
};

exports.post = (req, res) => {
  saveSection(req.session.id, 'additional', req.body)
    .then(() => {
      const buttonPressed = req.body.button;
      if (buttonPressed === 'next') {
        res.redirect('send');
      } else if (buttonPressed === 'previous') {
        res.redirect('background');
      } else {
        res.redirect('additional_info');
      }
    })
    .catch((err) => {
      console.log(err);
      req.flash('error', 'Sorry - the additional information section couldn\'t be saved');
      res.redirect('additional_info');
    });
};
