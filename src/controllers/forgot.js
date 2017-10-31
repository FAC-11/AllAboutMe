const sendemail = require('sendemail');

const email = sendemail.email;
sendemail.set_template_directory('src/email_templates');

exports.get = (req, res) => {
  res.render('forgot', {
    activePage: {
      forgot: true,
    },
    pageTitle: 'Forgotten password',
  });
};

exports.post = (req, res) => {
};
