exports.get = (req, res) => {
  res.render('signup', {activePage: {signup: true}});
};
