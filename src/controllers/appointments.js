const {
  saveSection,
  getSection,
} = require('../model/form_queries');

exports.get = (req, res) => {
  getSection(req.session.id, 'appointments')
    .then((data) => {
      // for ticking correct checkbox based on previously saved answer
      const contactMethods = data.contact_preference ? data.contact_preference.replace(/\{|\}/g, '').split(',') : [];
      let checked = {
        contactBy: {},
        worker: { [data.gender_preference]: true },
        time: { [data.time_preference]: true },
        parent_involvement: { [data.parent_involvement]: true },
      };
      contactMethods.forEach((method) => {
        checked.contactBy[method] = true;
      });
      res.render('appointments', {
        activePage: { appointments: true },
        errorMessages: req.flash('error'),
        successMessages: req.flash('success'),
        pageTitle: 'Your appointment',
        data,
        checked,
        progressPercentage: '20',
        previousPage: '/progress',
        nextPage: '/symptoms',
      });
    });
};

exports.post = (req, res) => {
  saveSection(req.session.id, 'appointments', req.body)
    .then(() => {
      req.flash('success', 'Appointments section saved');
      res.redirect('symptoms');
    }).catch((err) => {
      console.log(err);
      req.flash('error', 'Sorry - the appointments section couldn\'t be saved');
      res.redirect('appointments');
    });
};
