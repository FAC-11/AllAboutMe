const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
require('env2')('config.env');

const { getForm } = require('../model/form_queries');
const { validateSendEmail } = require('./helpers/validate');

const generatePdf = (filePath, formData) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  Object.keys(formData).forEach((field) => {
    doc.text(`${field}: `);
    if (field.includes('_svg') && formData[field]) {
      const dataUri = JSON.parse(formData[field]).jpg;
      doc.image(dataUri, { width: 300 });
    } else {
      doc.text(formData[field]);
    }
  });
  doc.end();
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
      const fileName = `form-${req.session.id}.pdf`;
      const filePath = path.join(__dirname, '..', '..', 'assets');
      generatePdf(path.join(filePath, fileName), data);
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
        subject: 'Form submission',
        text: `Answers from ${req.session.user}`,
        attachments: [
          {
            filename: fileName,
            path: path.join(filePath, fileName),
          },
        ],
      };
      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log('transporter', err);
        } else {
          console.log(info);
          res.redirect('finish');
        }
      });
      //end nodemailer
    }).catch((error) => {
      console.log('general', error);
      res.status(500).render('error', {
        layout: 'error',
        statusCode: 500,
        errorMessage: 'Internal server error'
      });
    });
  }
};
