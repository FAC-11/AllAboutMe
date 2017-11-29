const {saveSection, getSection} = require('../model/form_queries');

exports.get = (req, res, next) => {
  getSection(req.session.id, 'appointments').then((data) => {
    // for ticking correct checkbox based on previously saved answer
    if (data) {
      const contactMethods = data.contact_preference
        ? data.contact_preference.replace(/\{|\}/g, '').split(',')
        : [];
      let checked = {
        contactBy: {},
        worker: {
          [data.gender_preference]: true
        },
        time: {
          [data.time_preference]: true
        },
        parent_involvement: {
          [data.parent_involvement]: true
        }
      };
      contactMethods.forEach((method) => {
        checked.contactBy[method] = true;
      });
      res.render('appointments', {
        activePage: {
          appointments: true
        },
        errorMessages: req.flash('error'),
        successMessages: req.flash('success'),
        logoutButton: true,
        pageTitle: 'Your appointment',
        data,
        checked,
        progressPercentage: '10',
        firstPage: true
      });
    } else {
      req.flash('error', 'Sorry - we couldn\'t load your saved answers for this section');
      res.render('appointments', {
        activePage: {
          appointments: true
        },
        errorMessages: req.flash('error'),
        successMessages: req.flash('success'),
        logoutButton: true,
        pageTitle: 'Your appointment',
        progressPercentage: '10',
        firstPage: true
      })
    }
  }).catch((err) => {
    next(err);
  });
};
exports.post = (req, res, next) => {
  saveSection(req.session.id, 'appointments', req.body).then(() => {
    const buttonPressed = req.body.button;
    if (buttonPressed === 'next') {
      res.redirect('symptoms');
    } else {
      res.redirect('appointments');
    }
  }).catch((err) => {
    next(err);
  });
};
