const { URL } = require('url');
const { getUser } = require('../model/user_queries');
const redis = require('redis');
const sendemail = require('sendemail');
const { generateToken } = require('./helpers/helpers');
require('env2')('config.env');

const email = sendemail.email;
sendemail.set_template_directory('src/email_templates');

exports.get = (req, res) => {
  res.render('forgot', {
    errorMessages: req.flash('error'),
    successMessages: req.flash('success'),
    activePage: {
      forgot: true
    },
    pageTitle: 'Forgotten password'
  });
};

exports.post = (req, res) => {

  getUser(req.body.email).then((userObj) => {
    if (userObj) {
      const token = generateToken();
      const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
      const client = redis.createClient({ url: redisUrl });

      client.on('error', (error) => {
        console.log('error', error);
      });
      client.set(token, req.body.email, 'EX', 1800);

      const hostname = process.env.NODE_ENV === 'production' ? 'https://allaboutme-af.herokuapp.com' : 'localhost:4001';

      const person = {
        name: userObj.name,
        email: userObj.email,
        subject: 'All about me - reset your password',
        url: `${hostname}/reset/${token}`,
      };
      email('reset', person, (error, result) => {
        if (error) {
          console.log('error', error);
          req.flash('error', 'There was an error with sending the password recovery email, please try again.');
          res.redirect('/forgot');
        } else {
          req.flash('success', 'Success! Please check your email and follow the instructions in order to reset your password.');
          res.redirect('/forgot');
        }
      });
    } else {
      req.flash('error', 'There is no registered user with the email address provided.');
      res.redirect('/forgot');
    }
  }).catch((error) => {
    console.log('error from getUser query in forgot.js', error);
    res.status(500).render('error', {
      layout: 'error',
      statusCode: 500,
      errorMessage: 'Internal server error'
    });
  });
};
