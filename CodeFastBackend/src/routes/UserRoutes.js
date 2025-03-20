const express = require('express');
const router = express.Router();
const {getAllStudents, getStudentbyId, updateStudent, deleteStudent, subscribePlan, applyJob, CurrentUser} = require('../controllers/UserController');

router.get('/', getAllStudents);
router.get('/:id', getStudentbyId);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);
router.get('/me', CurrentUser);
router.put('/subscribe/:id', subscribePlan);
router.put('/apply/:id/:jobId', applyJob);

module.exports = router;