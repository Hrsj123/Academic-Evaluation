const express = require('express');
const router = express.Router();

// Assessment controller!
const assessmentController = require('../controllers/Assessment/assessmentController');

// User Authorization
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../config/rolesList');



router.route('/:username')
    .get(verifyRoles(ROLES_LIST.Teacher), assessmentController.getAssessment)                       // Teacher, one student(self)
    .patch(verifyRoles(ROLES_LIST.Teacher), assessmentController.changeAssessmentScore)
    .put(verifyRoles(ROLES_LIST.Teacher), assessmentController.updateAssessment);                   // teacher



module.exports = router;