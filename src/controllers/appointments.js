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
      parent_involvement: {[data.parent_involvement]: true },
    };
    contactMethods.forEach((method) => {
      checked.contactBy[method] = true;
    });
    res.render('appointments', {
      activePage: { appointments: true },
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
    res.redirect('symptoms');
  }).catch((err) => {
    res.render('appointments', {
      activePage: { appointments: true },
      pageTitle: 'Your appointment',
      progressPercentage: '15%',
      previousPage: '/progress',
      nextPage: '/symptoms',
      messages: [{ error: true, content: 'Sorry - the appointments section couldn\'t be saved' }],
    });
  });
};
