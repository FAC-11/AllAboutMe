exports.get = (req, res) => {
  res.render('progress', {
    activePage: {progress: true},
    pageTitle: 'Your Progress',
  });
}
