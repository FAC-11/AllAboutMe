exports.get = (req, res) => {
  res.render('appointments', {
    activePage: { appointments: true },
    pageTitle: 'Your appointment',
    percentage: '15%',
    previousPage: '/progress',
    nextPage: '/symptoms',
  });
};
