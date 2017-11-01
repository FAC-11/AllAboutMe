const redis = require('redis');
const {URL} = require('url');
const {validatePassword, validateConfirmPassword} = require('./validate');
const {hashPassword} = require('./passwordModule');

exports.get = (req, res) => {
  const client = redis.createClient();

  client.on('error', (error) => {
    console.log('error', error);
  });

  client.get(req.params.token, (error, reply) => {
    if (error || reply === null) {
      req.flash('error', 'Link is invalid or has expired, please try again.');
      res.redirect('/forgot');
    } else {
      res.render('reset', {
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
  console.log(req.headers.referer);
  const myUrl = new URL(req.headers.referer);
  const token = myUrl.pathname.split('/reset/')[1];

  const client = redis.createClient();

  client.on('error', (error) => {
    console.log('error', error);
  });

  client.get(token, (error, reply) => {
    if (error || reply === null) {
      req.flash('error', 'Link is invalid or has expired, please try again.');
      res.redirect('/forgot');
    } else {
      const userInput = req.body;
      if (validatePassword(req.body.password) && validateConfirmPassword(req.body.confirmPassword)) {
        const hashedPassword = hashPassword(userInput.password);

      }
    }
  
  });
};
