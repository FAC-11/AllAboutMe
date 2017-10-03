const { sign } = require("./passwordModule")();
const signupDatabase = require("./../model/signupDatabase");
const loginDatabase = require("./../model/loginDatabase");

// Can't do this until the database is made!!

// module.exports = (req, res) => {
//   loginDatabase(req.body.email, (err, userData))
// }
