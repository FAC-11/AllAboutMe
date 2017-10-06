const nodemailer = require('nodemailer');
// const mg = require('nodemailer-mailgun-transport');
// const handelbars = require('handlebars');
const checkEmail = require('./check_Email');
const env = require('env2')('config.env');

exports.get = (req, res) => {
  res.render('send', {
    activePage: {
      send: true,
    },
    pageTitle: 'Send',
  });
};

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});


const sendMail = (userData, emailAddress) => {
  checkEmail(emailAddress);
  const mailOptions = {
    from: userData.name, // grab form data from the request body object
    to: emailAddress,
    subject: 'All about me Questionnaire',
    text: 'Questionnaire',
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('message has been sent');
      res.redirect('/finish');
    }

    transporter.close();
  });


  // if (mailOptions.to.length < 1) {
  //   res.status(400).render('login', {
  //     pageTitle: 'Send',
  //     messages: [
  //       {
  //         content: validate.message,
  //         error: true,
  //       },
  //     ],
  //   });
};

module.exports = sendMail;
