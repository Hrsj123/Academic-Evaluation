// To handle logout request and issuing accessToken (for a valid refreshToken) from any user (with any role)
const express = require('express');
const router = express.Router();

const refreshTokenController = require('../controllers/refreshTokenController');
const logoutController = require('../controllers/logoutController');

router.get('/refreshToken', refreshTokenController.handleRefreshToken);
router.get('/logout', logoutController.handleLogout);

module.exports = router;
