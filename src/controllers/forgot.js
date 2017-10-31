
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

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
