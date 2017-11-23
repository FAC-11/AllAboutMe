const sendemail = require('sendemail');
const env = require('env2')('config.env');
const path = require('path');
const fs = require('fs');

const email = sendemail.email;
sendemail.set_template_directory('src/email_templates');
const { getForm } = require('../model/form_queries');
const { validateSendEmail } = require('./helpers/validate');

const PDFDocument = require('pdfkit');


const generateText = (answers) => {
  return `
    Things you like: ${answers.likes}\n 
    Things you dislike: ${answers.dislikes}
  `;
};

exports.get = (req, res) => {
  res.render('send', {
    errorMessages: req.flash('error'),
    successMessages: req.flash('success'),
    activePage: {
      send: true,
    },
    pageTitle: 'Send',
  });
};

exports.post = (req, res) => {
  const validatedEmail = validateSendEmail(req.body);
  if (!validatedEmail.isValid) {
    req.flash('error', validatedEmail.message);
    res.redirect('send');
  } else {
    getForm(req.session.id).then((data) => {
      const doc = new PDFDocument();
      const filePath = path.join(__dirname, '..', '..', 'assets', `form-${req.session.id}.pdf`);
      doc.pipe(fs.createWriteStream(filePath));
      console.log(JSON.parse(data.likes_svg).svg);
      doc.text(generateText(data), 100, 100);
      doc.image(JSON.parse(data.likes_svg).jpg, { width: 300 });
      doc.end();
      data.likes_svg = JSON.parse(data.likes_svg).svg;
      const context = Object.assign(data, { name: req.session.user });
      const options = {
        templateName: 'hello',
        subject: 'All about me questionnaire',
        toAddresses: [req.body.email],
        htmlCharset: 'utf16',
        textCharset: 'utf16',
        subjectCharset: 'utf8',
        context,
      };

      if (req.body.sendemailcopy) {
        options.bccAddresses = [data.email];
      }
      return options;
    }).catch((error) => {
      console.log(error);
      res.status(500).render('error', {
        layout: 'error',
        statusCode: 500,
        errorMessage: 'Internal server error'
      });
    }).then((options) => {
      //sendemail.sendMany(options, (error, result) => {
        //res.redirect('finish');
      //});
    });
  }
};
