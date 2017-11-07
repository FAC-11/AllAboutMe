const {
  saveSection,
  getSection,
} = require('../model/form_queries');

exports.get = (req, res) => {
  getSection(req.session.id, 'symptoms')
    .then((data) => {
      let checked = {
        agreement: { [data ? data.diagnosis_agreement : '']: true },
      };
      res.render('symptoms', {
        activePage: { symptoms: true },
        errorMessages: req.flash('error'),
        successMessages: req.flash('success'),
        pageTitle: 'Symptoms & Difficulties',
        progressPercentage: '40',
        previousPage: '/appointments',
        nextPage: '/about',
        data,
        checked,
      });
    });
};

exports.post = (req, res) => {
  saveSection(req.session.id, 'symptoms', req.body)
    .then(() => {
      res.redirect('about');
    })
    .catch((err) => {
      req.flash('error', 'Sorry - the symptoms section couldn\'t be saved');
      res.render('symptoms', {
        activePage: { symptoms: true },
        pageTitle: 'Symptoms & Difficulties',
        progressPercentage: '40',
        previousPage: '/appointments',
        nextPage: '/about',
      });
    });
};
