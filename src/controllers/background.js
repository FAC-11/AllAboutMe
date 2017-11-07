const { saveSection, getSection } = require('../model/form_queries');

exports.get = (req, res) => {
  getSection(req.session.id, 'background')
    .then((data) => {
      res.render('background', {
        activePage: { background: true },
        pageTitle: 'Your background',
        progressPercentage: '80',
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.render('background', {
        activePage: { background: true },
        pageTitle: 'Your background',
        progressPercentage: '60%',
      });
    });
};

exports.post = (req, res) => {
  saveSection(req.session.id, 'background', req.body)
    .then(() => {
      const buttonPressed = req.body.button;
      if (buttonPressed === 'next') {
        res.redirect('send');
      } else if (buttonPressed === 'previous') {
        res.redirect('about');
      } else {
        res.redirect('background');
      }
    })
    .catch((err) => {
      console.log(err);
      res.render('background', {
        activePage: { background: true },
        pageTitle: 'Your background',
        percentage: '85%',
        messages: [{ error: true, message: 'Sorry - the background section couldn\'t be saved' }],
      });
    });
};
