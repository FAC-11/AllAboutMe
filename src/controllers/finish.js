// const checkEmail = require('./check_email');
const sendemail = require('sendemail');
const env = require('env2')('config.env');

const email = sendemail.email;
sendemail.set_template_directory('src/email_templates');
const { getForm } = require('../model/form_queries');


exports.post = (req, res) => {


  getForm(1)
  //getForm(req.session.id)
  .then((results) => {
    const person = {
      name: 'Clinician',
      email: req.body.email,
      subject: 'All about me questionnaire',
      text: '',
    };
    //const person = { ...basic};
    console.log('results', results);
    person['text'] = results.map( (result) => {
      return Object.assign({}, result);
    });
    console.log('person', person);
  })
  .catch((error) => {
    console.log('error', error);
  });
    // .then(sections => {
    //
    //   const person =
    //   //  person['text'] +=
    //   //  return person;
    // })
    // .catch( error => {
    //   person['text'] += JSON.stringify('error', error);
    //   return person;
    // })
    // .then( person => {
    //   email('Hello', person, (error, result) => {
    //     console.log(' - - - - - - - - - - - - - - - - - - - - -> email sent: ');
    //     console.log(result);
    //     console.log('error: ', error);
    //     console.log('person', person);
    //     console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
    //   });

  res.render('finish', {

    activePage: {
      finish: true,
    },
  });
};
