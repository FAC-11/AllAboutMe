exports.get = (req, res) => {
  res.render('reset', {
    activePage: {
      reset: true,
    },
    pageTitle: 'Reset',
  });
};

// step 1. does user exist in database with that token?
//step 2. check expiry, is token still valid?
exports.post = (req, res) => {
, function(req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        req.flash('error', 'Password reset token is invalid or has expired.');
        return res.redirect('/forgot');
      }
      res.render('reset', {
        user: req.user
      });
    });
  });
}
