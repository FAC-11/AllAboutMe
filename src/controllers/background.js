const { saveSection, getSection } = require('../model/form_queries');

exports.get = (req, res) => {
  getSection(req.session.id, 'background')
    .then((data) => {
      res.render('background', {
        activePage: { background: true },
        pageTitle: 'Your background',
        logoutButton: true,
        progressPercentage: '80',
        previousPage: '/about',
        nextPage: '/send',
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.render('background', {
        activePage: { background: true },
        pageTitle: 'Your background',
        logoutButton: true,
        progressPercentage: '60%',
        previousPage: '/about',
        nextPage: '/send',
      });
    });
};

exports.post = (req, res) => {
  saveSection(req.session.id, 'background', req.body)
    .then(() => {
      res.redirect('send');
    })
    .catch((err) => {
      console.log(err);
      res.render('background', {
        activePage: { background: true },
        pageTitle: 'Your background',
        logoutButton: true,
        percentage: '85%',
        previousPage: '/about',
        nextPage: '/send',
        messages: [{ error: true, message: 'Sorry - the background section couldn\'t be saved' }],
      });
    });
};
