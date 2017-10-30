const { saveAboutMe, getSection } = require('../model/form_queries');

exports.get = (req, res) => {
  getSection(req.session.id, 'about')
    .then((data) => {
      res.render('about', {
        activePage: { about: true },
        pageTitle: 'About Me',
        progressPercentage: '60',
        previousPage: '/symptoms',
        nextPage: '/background',
        data,
      });
    });
};

exports.post = (req, res) => {
  saveAboutMe(req.session.id, req.body)
    .then(() => {
      res.redirect('background');
    })
    .catch((err) => {
      console.log(err);
      res.render('about', {
        activePage: { aboutMe: true },
        pageTitle: 'About Me',
        messages: [{ error: true, content: 'Sorry - the about me section couldn\'t be saved' }],
      });
    });
};
