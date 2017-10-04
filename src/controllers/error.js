exports.get = (req, res) => {
  res.render('error', { activePage: { error: true } });
};
