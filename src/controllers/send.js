exports.get = (req, res) => {
  res.render('send', {
    activePage: { send: true },
    pageTitle: 'Send',
    percentage: '95%',
  });
};
