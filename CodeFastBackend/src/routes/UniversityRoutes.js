const express = require('express');
const router = express.Router();

const { addUniversity, getAllUniversities } = require('../controllers/UniversityController');

router.get('/', getAllUniversities);
router.post('/', addUniversity);

module.exports = router;