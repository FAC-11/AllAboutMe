exports.get = (req, res) => {
  res.render('background', {
    activePage: { background: true },
    pageTitle: 'Your background',
    percentage: '85%',
  });
};
