const redis = require('redis');

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

  //  function(req, res) {
  //     User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
  //       if (!user) {
  //         req.flash('error', 'Password reset token is invalid or has expired.');
  //         return res.redirect('/forgot');
  //       }
  //       res.render('reset', {
  //         user: req.user
  //       });
  //     });
  //   });
};
