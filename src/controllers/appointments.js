const {
  saveAppointments,
  saveClosing,
  getSection,
} = require('../model/form_queries');

exports.get = (req, res) => {

  Promise.all([
    getSection(req.session.id, 'appointments'),
    getSection(req.session.id, 'closing'),
  ]).then((dataArr) => {
    const data = Object.assign(dataArr[0], dataArr[1]);
    // for ticking correct checkbox based on previously saved answer
    const contactMethods = data.contact_preference ? data.contact_preference.replace(/\{|\}/g, '').split(',') : [];
    let checked = {
      contactBy: {},
      worker: { [data.worker_preferences]: true },
      time: { [data.appointment_preferences]: true },
    };
    contactMethods.forEach((method) => {
      checked.contactBy[method] = true;
    });
    res.render('appointments', {
      activePage: { appointments: true },
      pageTitle: 'Your appointment',
      data,
      checked,
      progressPercentage: '20%',
      previousPage: '/progress',
      nextPage: '/symptoms',
    });
  });
};

exports.post = (req, res) => {
  saveAppointments(req.session.id, req.body).then(() => {
    return saveClosing(req.session.id, req.body);
  }).then(() => {
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
