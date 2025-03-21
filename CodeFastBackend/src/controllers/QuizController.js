const Quiz = require('../models/QuizModel.js');
const Course = require('../models/CourseModel.js');

const createQuiz = async (req, res) => {
    try {
        const courseId=req.params.courseId;
        const { name, totalMarks } = req.body;
        const courseExists = await Course.findById(courseId);
        if (!courseExists) {
            console.log(courseId)
            return res.status(400).json({ message: "Invalid course ID. Course not found." });
        }
        if (totalMarks <= 0) {
            return res.status(400).json({ message: "Total marks must be a positive number." });
        }
        const quiz = new Quiz({ courseId, name, totalMarks });
        await quiz.save();
        res.status(201).json({ message: "Quiz created successfully", quiz });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllQuizzes = async (req, res) => {
    try {
        const courseId=req.params.courseId;
        const quizzes = await Quiz.find({courseId});
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId);
        if (!quiz) return res.status(404).json({ message: "Quiz not found" });

        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    createQuiz,
    getAllQuizzes,
    getQuizById
};