const express = require('express');
const router = express.Router();
const {
    getAllCourse,
    getCoursebyId,
    AddQuizesInCourse,
    AddCourse
} = require('../controllers/CourseController');