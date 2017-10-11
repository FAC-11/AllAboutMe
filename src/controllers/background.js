const { saveBackgrounds, getSection } = require('../model/form_queries');

exports.get = (req, res) => {
  getSection(req.session.id, 'backgrounds')
    .then((data) => {
      res.render('background', {
        activePage: { background: true },
        pageTitle: 'Your background',
        percentage: '85%',
        previousPage: '/about',
        nextPage: '/send',
        background: data.background,
      });
    })
    .catch((err) => {
      console.log(err);
      res.render('background', {
        activePage: { background: true },
        pageTitle: 'Your background',
        percentage: '85%',
        previousPage: '/about',
        nextPage: '/send',
      });
    });
};

exports.post = (req, res) => {
  saveBackgrounds(req.session.id, req.body)
    .then(() => {
      res.render('send', {
        activePage: { send: true },
        pageTitle: 'Send',
        percentage: '85%',
        previousPage: '/background',
      });
    })
    .catch((err) => {
      console.log(err);
      res.render('send', {
        activePage: { send: true },
        pageTitle: 'Send',
        percentage: '85%',
        previousPage: '/background',
        messages: [{ error: true, message: 'Sorry - the background section couldn\'t be saved' }],
      });
    });
};
