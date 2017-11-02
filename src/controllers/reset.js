const redis = require('redis');
const {URL} = require('url');
const {validatePasswordUpdate} = require('./validate');
const {hashPassword} = require('./passwordModule');
const {updatePassword} = require('../model/user_queries');

exports.get = (req, res) => {
  const client = redis.createClient(process.env.REDIS_URL);

  client.on('error', (error) => {
    console.log('error', error);
  });

  client.get(req.params.token, (error, reply) => {
    if (error || reply === null) {
      req.flash('error', 'Link is invalid or has expired, please try again.');
      res.redirect('/forgot');
    } else {
      res.render('reset', {
        errorMessages: req.flash('error'),
        successMessages: req.flash('success'),
        activePage: {
          reset: true
        },
        pageTitle: 'Reset'
      });
    }
  });
};

// step 1. does user exist in database with that token?
//step 2. check expiry, is token still valid?
// step 3. check passwords to be the same
//step 4. update entry in database
exports.post = (req, res) => {

  const myUrl = new URL(req.headers.referer);
  const token = myUrl.pathname.split('/reset/')[1];

  const client = redis.createClient(process.env.REDIS_URL);

  client.on('error', (error) => {
    console.log('error', error);
  });

  client.get(token, (error, email) => {
    if (error || email === null) {
      req.flash('error', 'Link is invalid or has expired, please try again.');
      res.redirect('/forgot');
    } else {
      const validator = validatePasswordUpdate(req.body);
      if (validator.isValid) {
        hashPassword(req.body.password)
          .then((hashedPassword) => {
            updatePassword(hashedPassword, email)
          })
          .then(() =>{
            req.flash('success', 'Password is updated successfully.');
            res.redirect('/login');
          })
          .catch((err) => {
            console.log('error from updatePassword query in reset.js', err);
            res.status(500).render('error', {
              layout: 'error',
              statusCode: 500,
              errorMessage: 'Internal server error'
            });
          });
        client.del(token, email);
      }else{
        req.flash('error', validator.message);
        res.redirect(`/reset/${token}`);
      }
    }
  });
};
