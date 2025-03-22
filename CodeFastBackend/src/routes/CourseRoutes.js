const express = require('express');
const router = express.Router();
const {getAllCourse, getCoursebyId, AddCourse} = require('../controllers/CourseController');
const {authorize} = require("../middleware/AuthMiddleware");
const { createQuiz, getAllQuizzes, getQuizById } = require('../controllers/QuizController');
const {createStudentEvaluation} = require("../controllers/EvaluationController");
//Course routes
router.post("/evaluation", createStudentEvaluation);
router.get('/', getAllCourse);
router.post('/', AddCourse);
router.get('/:id', getCoursebyId);

//Quiz Routes
router.get('/:courseId/quizzes', getAllQuizzes); 
router.post('/:courseId/quizzes', createQuiz); 
router.get('/quizes/:quizId', getQuizById); 

//Evaluation



module.exports = router;