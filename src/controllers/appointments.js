const { saveAppointments } = require('../model/form_queries');

exports.get = (req, res) => {
  res.render('appointments', {
    activePage: { appointments: true },
    pageTitle: 'Your appointment',
  });
};

exports.post = (req, res) => {
  saveAppointments(req.session.id, req.body).then(() => {
    res.render('symptoms', {
      activePage: { symptoms: true },
      pageTitle: 'Symptoms & Difficulties',
    });
  }).catch((err) => {
    console.log(err);
    res.render('symptoms', {
      activePage: { symptoms: true },
      pageTitle: 'Symptoms & Difficulties',
      messages: [{ error: true, message: 'Sorry - the appointments section couldn\'t be saved' }],
    });
  });
};
