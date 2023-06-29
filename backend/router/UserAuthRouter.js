const express = require('express');
const { displayHelloWorld } = require('../controllers/UserAuthControllers');
const router = express.Router();

router.get('/', displayHelloWorld);

module.exports = ('UserAuthRouter', router);