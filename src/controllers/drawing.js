const {
  saveDrawing,
  getDrawing,
} = require('../model/form_queries');

exports.post = (req, res) => {
  saveDrawing(req.session.id, req.body.fieldName, req.body)
    .then(() => {
      console.log('saved');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.get = (req, res) => {
  getDrawing(req.session.id, 'likes_svg')
    .then((svgObj) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(svgObj);
    })
    .catch(console.log);
};
