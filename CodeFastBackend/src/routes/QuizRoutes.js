const express = require('express');
const router = express.Router();
const {
    createQuiz,
    getAllQuizzes,
    getQuizzesByCourse,
    getQuizById,
    updateQuiz,
    deleteQuiz,
    addQuestionToQuiz,
    removeQuestionFromQuiz
} = require('../controllers/QuizController');

// Base routes
router.route('/')
    .post(createQuiz)
    .get(getAllQuizzes);

// Routes for specific quiz
router.route('/:id')
    .get(getQuizById)
    .put(updateQuiz)
    .delete(deleteQuiz);

// Course-specific routes
router.route('/course/:courseId')
    .get(getQuizzesByCourse);

// Question management routes
router.route('/:id/questions')
    .post(addQuestionToQuiz);

router.route('/:quizId/questions/:questionId')
    .delete(removeQuestionFromQuiz);

module.exports = router;