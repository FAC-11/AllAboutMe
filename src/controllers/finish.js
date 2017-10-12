const checkEmail = require('./check_email');
const sendemail = require('sendemail');
const env = require('env2')('config.env');

const email = sendemail.email;
sendemail.set_template_directory('src/email_templates');
const { getForm } = require('../model/form_queries');
const { mergeObj, addData } = require('./helpers.js');

exports.post = (req, res) => {

  getForm(1)
  //getForm(req.session.id)
    .then((data) => {

      const person1 = {
        name: 'person',
        email: req.body.email,
        subject: 'All about me questionnaire',
      };

      const cleanData = mergeObj(data);

      console.log(cleanData);
      addData(person1, cleanData);
      console.log('person', person1);
      return person1;
    })
    .catch( (error) => {
      console.log('error', error);
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
