const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const home = require('./home');
// const login = require('./login');
const signup = require('./signup');

router.get('/', home.get);
// router.get('/login', login.get);
router.get('/signup', signup.get);

module.exports = router;
