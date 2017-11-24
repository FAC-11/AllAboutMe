const {
  saveDrawing,
  getDrawing,
} = require('../model/form_queries');

exports.post = (req, res) => {
  res.send('this is response:' + JSON.stringify(req.body));
  //saveDrawing(req.session.id, req.body.fieldName, req.body)
    //.then(() => {
      //console.log('saved');
      //res.setHeader('Content-Length', '0');
      //res.end();
    //})
    //.catch((err) => {
      //console.log(err);
    //});
};

exports.get = (req, res) => {
  getDrawing(req.session.id, req.query.question + '_svg')
    .then((svgObj) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(svgObj);
    })
    .catch(console.log);
};
