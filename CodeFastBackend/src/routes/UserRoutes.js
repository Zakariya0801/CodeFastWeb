const express = require('express');
const router = express.Router();
const {getAllStudents, getStudentbyId, updateStudent, deleteStudent, subscribePlan, applyJob, CurrentUser, CurrentRole, fetchStudentLogs} = require('../controllers/UserController');

router.get('/', getAllStudents);
router.get('/me', CurrentUser);
router.get('/role', CurrentRole);
router.get('/:id', getStudentbyId);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);
router.put('/subscribe/:id', subscribePlan);
router.put('/apply/:id/:jobId', applyJob);
router.get('/analytics/:id', fetchStudentLogs);

module.exports = router;

