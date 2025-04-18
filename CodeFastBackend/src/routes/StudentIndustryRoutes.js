const express = require('express');
const router = express.Router();
const studentIndustryController = require('../controllers/StuddentIndustryController');

router.post('/apply', studentIndustryController.applyJob);
router.post('/approach', studentIndustryController.approachStudent);
router.put('/:studentId/:jobId/status', studentIndustryController.updateStatus);
router.get('/', studentIndustryController.getAllStudentIndustry);
router.delete('/:studentId/:jobId', studentIndustryController.deleteStudentIndustry);
router.get('/:studentId/:jobId', studentIndustryController.getStudentIndustryById);
module.exports = router;
