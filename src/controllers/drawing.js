const {
  saveDrawing,
  getDrawing,
} = require('../model/form_queries');

exports.post = (req, res) => {
  console.log(req.body);
  saveDrawing(req.session.id, req.body.fieldName, req.body.svg)
    .then(() => {
      console.log('saved');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.get = (req, res) => {
  getDrawing(req.session.id, 'likes_svg')
    .then((svg) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(svg);
    })
    .catch(console.log);
};
