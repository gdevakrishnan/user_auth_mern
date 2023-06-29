const express = require('express');
const { addUserDetails, getUserDetails, getAUserDetails, updateUserDetails, deleteUserDetails } = require('../controllers/UserAuthControllers');
const router = express.Router();

router.post('/', addUserDetails);
router.get('/', getUserDetails);
router.get('/:id', getAUserDetails);
router.patch('/:id', updateUserDetails);
router.delete('/:id', deleteUserDetails);

module.exports = ('UserAuthRouter', router);