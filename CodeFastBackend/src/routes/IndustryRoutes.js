const express = require('express');
const router = express.Router();
const industryController = require('../controllers/IndustryController');

router.post('/', industryController.createIndustry);
router.get('/', industryController.getAllIndustries);
router.get('/interns', industryController.getInterns);
router.delete('/interns/:id', industryController.deleteIntern);
router.get('/:id', industryController.getIndustryById);
router.put('/:id', industryController.updateIndustry);
router.delete('/:id', industryController.deleteIndustry);

module.exports = router;