const express = require('express');
const router = express.Router();
const {getAllCourse, getCoursebyId, AddCourse} = require('../controllers/CourseController');
const {authorize} = require("../middleware/AuthMiddleware");

router.get('/', getAllCourse);
router.post('/', AddCourse);
router.get('/:id', getCoursebyId);


module.exports = router;