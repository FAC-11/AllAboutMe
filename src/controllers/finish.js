// const checkEmail = require('./check_email');
const sendemail = require('sendemail');
const env = require('env2')('config.env');

const email = sendemail.email;
sendemail.set_template_directory('src/email_templates');
const { getForm } = require('../model/form_queries');


exports.post = (req, res) => {

  const person = {
    name: 'Noone',
    email: req.body.email,
    subject: 'All about me questionnaire',
    text: 'nothing',
  };
  const aboutme = getForm(1)
        .then(result => {
          person['text'] = JSON.stringify(result);
          return person;
        })
        .then( person => {
          email('Hello', person, (error, result) => {
            console.log(' - - - - - - - - - - - - - - - - - - - - -> email sent: ');
            console.log(result);
            console.log('error: ', error);
            console.log('person', person);
            console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
          });
        });

  res.render('finish', {

    activePage: {
      finish: true,
    },
  });
};
