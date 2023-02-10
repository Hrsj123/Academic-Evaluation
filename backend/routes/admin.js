const express = require('express');
const router = express.Router();

// Admin Controller
const adminController = require('../controllers/Users/adminController');
// JWT
const AuthController = require('../controllers/authController');
const refreshTokenController = require('../controllers/refreshTokenController');
const logoutController = require('../controllers/logoutController');

router.route('/')       // Later add veriyfRoles!!!
    .get(adminController.getAdmins)
    .post(adminController.handleNewAdmin)                                  // Signup
    .put(adminController.updateAdmin)
    .delete(adminController.removeAdmin);

router.post('/auth', AuthController.handleLogin);                        // Login


module.exports = router;