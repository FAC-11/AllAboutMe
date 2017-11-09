const checkEmail = require('./check_email');
const sendemail = require('sendemail');
const env = require('env2')('config.env');

const email = sendemail.email;
sendemail.set_template_directory('src/email_templates');
const {getForm} = require('../model/form_queries');
const {mergeObj, addData} = require('./helpers.js');

exports.post = (req, res) => {

  getForm(req.session.id).then((data) => {
    const context = {
      name: req.session.user,
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
  }).then((options) => {
    sendemail.sendMany(options, (error, result) => {
      res.status(302).render('finish', {
        errorMessages: req.flash('error'),
        successMessages: req.flash('success'),
        activePage: {
          finish: true
        },
        logoutButton: true
      });
    });
  }).catch((error) => {
    console.log('error from send email', error);
    res.status(500).render('error', {
      layout: 'error',
      statusCode: 500,
      errorMessage: 'Internal server error'
    });
  });
};
