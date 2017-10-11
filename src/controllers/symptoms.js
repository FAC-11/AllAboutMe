exports.get = (req, res) => {
  res.render('symptoms', {
    activePage: { symptoms: true },
    pageTitle: 'Symptoms & Difficulties',
    percentage: '40%',
    previousPage: '/appointments',
    nextPage: '/about',
  });
};
