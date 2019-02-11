'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');

const router = express.Router();
router.use(express.json(), cookieParser());

router.post('/login', require('./actions/login'));

module.exports = router;
