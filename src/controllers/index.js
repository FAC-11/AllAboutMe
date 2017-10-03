const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const home = require('./home');
const signup = require('./signup');
const login = require('./login');

router.get('/home', home.get);
router.get('/signup', signup.get);
router.get('/', login.get)

router.post('/signup', signup.post);
router.post('/', login.post);


module.exports = router;
