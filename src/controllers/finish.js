const checkEmail = require('./check_Email');
const sendemail = require('sendemail');
const env = require('env2')('config.env');

const email = sendemail.email;
sendemail.set_template_directory('src/email_templates');


exports.post = (req, res) => {
  const person = {
    name: 'Clinician',
    email: req.body.email,
    subject: 'Hello :)',
  };
  // get the data from the database
  console.log('req.body: ', req.body);
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
