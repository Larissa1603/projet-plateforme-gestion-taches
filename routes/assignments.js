const express = require('express');
const router = express.Router();
const assignmentCtrl = require('../controllers/assignmentController');

router.get('/', assignmentCtrl.getAssignments);
router.post('/', assignmentCtrl.createAssignment);

module.exports = router;