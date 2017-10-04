exports.get = (req, res) => {
  res.render('home', { activePage: { home: true } });
};
