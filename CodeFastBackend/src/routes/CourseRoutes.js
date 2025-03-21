const express = require('express');
const router = express.Router();
const {getAllCourse, getCoursebyId, AddQuizesInCourse, AddCourse} = require('../controllers/CourseController');
const {authorize} = require("../middleware/AuthMiddleware");

router.get('/', getAllCourse);
router.post('/', authorize("Admin"), AddCourse);
router.get('/:id', getCoursebyId);
router.put('/:id', authorize("Admin"), AddQuizesInCourse);

module.exports = router;