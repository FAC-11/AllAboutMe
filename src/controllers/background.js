const { saveSection, getSection } = require('../model/form_queries');

exports.get = (req, res) => {
  getSection(req.session.id, 'background')
    .then((data) => {
      res.render('background', {
        activePage: { background: true },
        errorMessages: req.flash('error'),
        successMessages: req.flash('success'),
        pageTitle: 'Your background',
        logoutButton: true,
        progressPercentage: '70',
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      req.flash('error', 'Sorry - we couldn\'t load your saved answers for this section');
      res.render('background', {
        activePage: { background: true },
        errorMessages: req.flash('error'),
        successMessages: req.flash('success'),
        pageTitle: 'Your background',
        progressPercentage: '70',
        logoutButton: true,
      });
    });
};

exports.post = (req, res) => {
  saveSection(req.session.id, 'background', req.body)
    .then(() => {
      const buttonPressed = req.body.button;
      if (buttonPressed === 'next') {
        res.redirect('additional_info');
      } else if (buttonPressed === 'previous') {
        res.redirect('about');
      } else {
        res.redirect('background');
      }
    })
    .catch((err) => {
      console.log(err);
      req.flash('error', 'Sorry - the background section couldn\'t be saved');
      res.redirect('background');
    });
};
