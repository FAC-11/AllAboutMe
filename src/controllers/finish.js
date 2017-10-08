const checkEmail = require('./check_Email');
const sendemail = require('sendemail');
const env = require('env2')('config.env');

exports.get = (req, res) => {
  email('Hello', person, (error, result) => {
    console.log(' - - - - - - - - - - - - - - - - - - - - -> email sent: ');
    console.log(result);
    console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
  });
  res.render('finish', {
    activePage: {
      finish: true,
    },
  });
};

const email = sendemail.email;
sendemail.set_template_directory('src/email_templates');

const person = {
  name: 'Rebeca',
  email: 'rebecacalvoquintero@hotmail.es',
  subject: 'Hello :)',
};
