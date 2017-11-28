function errorpost(err, req, res, next) {
  if (err) {
    res.status(500);
    req.flash('error', `Sorry - the ${req.url.slice(1)} section couldn\'t be saved`);
    res.redirect(`${req.url}`);
  } else {
    next();
  }
}


module.exports = errorpost;
