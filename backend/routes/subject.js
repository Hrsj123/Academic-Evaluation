const express = require('express');
const router = express.Router();
// JWT
const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middleware/verifyRoles');
// Subject Controller --> Subjects are added by admin!
const subjectController = require('../controllers/subject/subjectController');


router.route('/')
    .get(subjectController.getSubjects)
    .post(verifyRoles(ROLES_LIST.Admin), subjectController.createSubject)                                  // Signup
    .put(verifyRoles(ROLES_LIST.Admin), subjectController.updateSubject)
    .delete(verifyRoles(ROLES_LIST.Admin), subjectController.removeSubject);

module.exports = router;