exports.post = (req, res) => {
  req.session = null;
  res.redirect('/');
};
