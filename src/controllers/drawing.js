const { saveDrawing } = require('../model/form_queries');

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
