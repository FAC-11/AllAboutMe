const checkEmail = require('./check_email');
const sendemail = require('sendemail');
const env = require('env2')('config.env');

const email = sendemail.email;
sendemail.set_template_directory('src/email_templates');
const {getForm} = require('../model/form_queries');
const {mergeObj, addData} = require('./helpers.js');

exports.post = (req, res) => {

  getForm(req.session.id).then((data) => {
    const context =  {
      tempalateVariableName: 'Variable Value',
      name: req.session.user
    };
    const cleanData = mergeObj(data);
    addData(context, cleanData);

    const options = {
      templateName: 'Hello',
      subject: 'All about me questionnaire',
      toAddresses: [req.body.email],
      htmlCharset: 'utf16',
      textCharset: 'utf16',
      subjectCharset: 'utf8'
    };
    options.context = context;

    if (req.body.sendemailcopy) {
      options.bccAddresses = [data.email];
    }
    return options;
  }).catch((error) => {
    console.log('error', error);
  }).then((options) => {
    sendemail.sendMany(options, (error, result) => {
      console.log(' - - - - - - - - - - - - - - - - - - - - -> email sent: ');
      console.log(result);
      console.log('error: ', error);
      console.log('options', options);
      console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
    });
  });
  res.render('finish', {
    errorMessages: req.flash('error'),
    successMessages: req.flash('success'),
    activePage: {
      finish: true
    },
    logoutButton: true,
  });
};
