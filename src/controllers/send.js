const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
require('env2')('config.env');

const { getForm } = require('../model/form_queries');
const { validateSendEmail } = require('./helpers/validate');

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
      data.likes_svg = JSON.parse(data.likes_svg).svg;
      doc.pipe(fs.createWriteStream(filePath));
      doc.text(generateText(data), 100, 100);
      doc.image(JSON.parse(data.likes_svg).jpg, { width: 300 });
      doc.end();
      //nodemailer
      let smtpConfig = {
        host: process.env.MAILGUN_SMTP_SERVER,
        auth: {
          user: process.env.MAILGUN_SMTP_LOGIN,
          pass: process.env.MAILGUN_SMTP_PASSWORD,
        },
      };
      let transporter = nodemailer.createTransport(smtpConfig);
      let message = {
        from: process.env.FROM_EMAIL,
        to: req.body.email,
        subject: 'test',
        text: 'do i send',
      };
      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
          res.redirect('finish');
        }
      });
      //end nodemailer
    }).catch((error) => {
      console.log(error);
      res.status(500).render('error', {
        layout: 'error',
        statusCode: 500,
        errorMessage: 'Internal server error'
      });
    });
  }
};
