const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const home = require('./home');
const signup = require('./signup');
const login = require('./login');
const info_page = require('./info_page');
const colour_scheme = require('./colour_scheme');
const progress = require('./progress');
const appointments = require('./appointments');
const symptoms = require('./symptoms');
const about = require('./about');
const background = require('./background');
const send = require('./send');
const finish = require('./finish');
const logout = require('./logout');

router.get('/', login.get);

router.get('/signup', signup.get);
router.get('/home', home.get);
router.get('/colour_scheme', colour_scheme.get);
router.get('/info-page', info_page.get);
router.get('/progress', progress.get);
router.get('/appointments', appointments.get);
router.get('/symptoms', symptoms.get);
router.get('/about', about.get);
router.get('/background', background.get);
router.get('/send', send.get);

router.post('/finish', finish.post);
router.post('/signup', signup.post);
router.post('/login', login.post);
router.post('/appointments', appointments.post);
router.post('/background', background.post);
router.post('/about', about.post);
router.post('/symptoms', symptoms.post);
router.post('/logout', logout.post);

module.exports = router;
