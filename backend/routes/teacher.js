const express = require('express');
const router = express.Router();

// Teacher Controller
const teacherController = require('../controllers/Users/teacherController');

// JWT
const AuthController = require('../controllers/authController');
const refreshTokenController = require('../controllers/refreshTokenController');
const logoutController = require('../controllers/logoutController');

// Roles 
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../config/rolesList');

router.route('/')
    .get(teacherController.getTeachers)
    .post(teacherController.handleNewTeacher)                                  // Signup
    .put(teacherController.updateTeacher)
    .delete(teacherController.removeTeacher);

router.post('/auth', AuthController.handleLogin);                        // Login


module.exports = router;``