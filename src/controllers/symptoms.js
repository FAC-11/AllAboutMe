const {
  saveSymptoms,
  getSection,
} = require('../model/form_queries');

exports.get = (req, res) => {
  getSection(req.session.id, 'symptoms')
    .then((data) => {
      res.render('symptoms', {
        activePage: { symptoms: true },
        pageTitle: 'Symptoms & Difficulties',
        percentage: '40%',
        previousPage: '/appointments',
        nextPage: '/about',
      });
    });
};

exports.post = (req, res) => {
  saveSymptoms(req.session.id, req.body)
    .then(() => {
      res.redirect('about');
    })
    .catch((err) => {
      res.render('symptoms', {
        activePage: { symptoms: true },
        pageTitle: 'Symptoms & Difficulties',
        percentage: '40%',
        previousPage: '/appointments',
        nextPage: '/about',
        messages: [{ error: true, content: 'Sorry - the symptoms section couldn\'t be saved' }],
      });
    });
};
