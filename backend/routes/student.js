const express = require('express');
const router = express.Router();

// Student Controller 
const studentController = require('../controllers/Users/studentController');
// Sign in Controllers: JWT
const authController = require('../controllers/authController');
const refreshTokenController = require('../controllers/refreshTokenController');
const logoutController = require('../controllers/logoutController');
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../config/rolesList');

router.route('/')
    .get(studentController.getStudents)
    .post(studentController.handleNewStudent)                                  // Signup
    .put(studentController.updateStudent)
    .delete(studentController.removeStudent);
    

router.post('/auth', authController.handleLogin);                 // Login

router.post('/registerSubject', studentController.addSubjectInAssignments);     

module.exports = router;   