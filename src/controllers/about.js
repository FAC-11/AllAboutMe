const { saveSection, getSection } = require('../model/form_queries');

exports.get = (req, res) => {
  getSection(req.session.id, 'about')
    .then((data) => {
      res.render('about', {
        activePage: { about: true },
        pageTitle: 'About Me',
        progressPercentage: '60',
        data,
      });
    });
};

exports.post = (req, res) => {
  saveSection(req.session.id, 'about', req.body)
    .then(() => {
      const buttonPressed = req.body.button;
      if (buttonPressed === 'next') {
        res.redirect('background');
      } else if (buttonPressed === 'previous') {
        res.redirect('symptoms');
      } else {
        res.redirect('about');
      }
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
