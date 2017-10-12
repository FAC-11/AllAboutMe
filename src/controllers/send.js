exports.get = (req, res) => {
  console.log(res.payload);
  res.render('send', {

    activePage: {
      send: true,
    },

    pageTitle: 'Send',
  });
};
