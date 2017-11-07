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
        pageTitle: 'Symptoms & Difficulties',
        progressPercentage: '40',
        data,
        checked,
      });
    });
};

exports.post = (req, res) => {
  saveSection(req.session.id, 'symptoms', req.body)
    .then(() => {
      const buttonPressed = req.body.button;
      if (buttonPressed === 'next') {
        res.redirect('about');
      } else if (buttonPressed === 'previous') {
        res.redirect('appointments');
      } else {
        res.redirect('symptoms');
      }
    })
    .catch((err) => {
      res.render('symptoms', {
        activePage: { symptoms: true },
        pageTitle: 'Symptoms & Difficulties',
        progressPercentage: '40',
        messages: [{ error: true, content: 'Sorry - the symptoms section couldn\'t be saved' }],
      });
    });
};
