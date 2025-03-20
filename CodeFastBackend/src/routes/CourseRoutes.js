const express = require('express');
const router = express.Router();
const {getAllCourse, getCoursebyId, AddQuizesInCourse, AddCourse} = require('../controllers/CourseController');

router.get('/', getAllCourse);
router.post('/', AddCourse);
router.get('/:id', getCoursebyId);
router.put('/:id', AddQuizesInCourse);

module.exports = router;