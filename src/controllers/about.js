const { saveSection, getSection } = require('../model/form_queries');

exports.get = (req, res) => {
  getSection(req.session.id, 'about')
    .then((data) => {
      res.render('about', {
        activePage: { about: true },
        errorMessages: req.flash('error'),
        successMessages: req.flash('success'),
        pageTitle: 'About Me',
        progressPercentage: '60',
        previousPage: '/symptoms',
        nextPage: '/background',
        data,
      });
    });
};

exports.post = (req, res) => {
  saveSection(req.session.id, 'about', req.body)
    .then(() => {
      req.flash('success', 'About me section saved');
      res.redirect('background');
    })
    .catch((err) => {
      console.log(err);
      req.flash('error', 'Sorry - the about me section couldn\'t be saved');
      res.redirect('about');
    });
};
