const express = require('express');
const { addUserDetails, getAUserDetails, updateUserDetails, deleteUserDetails } = require('../controllers/UserAuthControllers');
const router = express.Router();

router.post('/register', addUserDetails);
router.post('/login', getAUserDetails);
router.patch('/register/:id', updateUserDetails);
router.delete('/register/:id', deleteUserDetails);

module.exports = ('UserAuthRouter', router);