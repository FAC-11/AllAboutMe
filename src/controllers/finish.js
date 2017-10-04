exports.get = (req, res) => {
  res.render('finish', {
    activePage: {finish: true},
  });
}
