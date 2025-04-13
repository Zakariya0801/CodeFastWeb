const express = require('express');
const router = express.Router();
const {getAllCourse, getCoursebyId, AddCourse} = require('../controllers/CourseController');
const {protect, authorize} = require("../middleware/AuthMiddleware");
const {
    addRegistration,
    getRegistrations,
    deleteRegistration
} = require('../controllers/CourseRegistrationController');
const { createQuiz, getAllQuizzes, getQuizById } = require('../controllers/QuizController');
const {createStudentEvaluation,getStudentEvaluation} = require("../controllers/EvaluationController");
//Course routes
<<<<<<< HEAD

=======
router.get("/evaluation", protect, getStudentEvaluation);
router.post("/evaluation", protect , createStudentEvaluation);
>>>>>>> c5d238a54e02993a7e1d45f24e66a9eca5865565
router.get('/', getAllCourse);
router.post('/', protect, authorize("Admin"), AddCourse);
router.get("/registrations", protect, getRegistrations);
router.post("/registrations", protect, addRegistration);
router.delete("/registrations", protect, deleteRegistration);
router.get('/:id', getCoursebyId);

//Quiz Routes
router.post('/quizzes/', createQuiz); 
router.get('/quizzes/:courseId', getAllQuizzes); 
router.get('/quiz/:quizId', getQuizById); 

//Evaluation



module.exports = router;