const checkEmail = require('./check_email');
const sendemail = require('sendemail');
const env = require('env2')('config.env');

const email = sendemail.email;
sendemail.set_template_directory('src/email_templates');
const { getForm } = require('../model/form_queries');
const mergeObj = require('./helpers.js');

exports.post = (req, res) => {

  getForm(req.session.id)
    .then((results) => {
      console.log('results', results);
      const person = {
        name: 'Clinician',
        email: req.body.email,
        subject: 'All about me questionnaire',
        text: '',
      };
      person['text'] = JSON.stringify(mergeObj(results));
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
