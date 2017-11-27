const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
require('env2')('config.env');

const { getForm } = require('../model/form_queries');
const { validateSendEmail } = require('./helpers/validate');

const generatePdf = (doc, formData) => {
  Object.keys(formData).forEach((field) => {
    doc.text(`${field}: `);
    if (field.includes('_svg') && formData[field]) {
      const dataUri = JSON.parse(formData[field]).jpg;
      doc.image(dataUri, { width: 300 });
    } else {
      doc.text(formData[field]);
    }
  });
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
      const fileName = `form-${req.session.user}.pdf`;
      // pdfkit
      const doc = new PDFDocument();
      let buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        // nodemailer
        const smtpConfig = {
          host: process.env.MAILGUN_SMTP_SERVER,
          auth: {
            user: process.env.MAILGUN_SMTP_LOGIN,
            pass: process.env.MAILGUN_SMTP_PASSWORD,
          },
        };
        const transporter = nodemailer.createTransport(smtpConfig);
        const message = {
          from: process.env.FROM_EMAIL,
          to: req.body.email,
          subject: 'Form submission',
          text: `Answers from ${req.session.user}`,
          attachments: [
            {
              filename: fileName,
              content: pdfData,
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
        // end nodemailer
      });
      generatePdf(doc, data);
      doc.end();
      // end pdfkit
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
