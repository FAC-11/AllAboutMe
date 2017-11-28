const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
require('env2')('config.env');

const { getForm } = require('../model/form_queries');
const { validateSendEmail } = require('./helpers/validate');
const { populatePdf } = require('./helpers/send');

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
          service: 'SendGrid',
          auth: {
            user: process.env.SENDGRID_USERNAME,
            pass: process.env.SENDGRID_PASSWORD,
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
            console.log(err);
            req.flash('error', 'Email couldn\'t be sent. Please try again');
            res.redirect('send');
          } else {
            res.redirect('finish');
          }
        });
        // end nodemailer
      });
      populatePdf(doc, data, req.session.user);
      doc.end();
      // end pdfkit
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
