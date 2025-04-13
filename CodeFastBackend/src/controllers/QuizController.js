const Quiz = require('../models/QuizModel');

// Create a new quiz
const createQuiz = async (req, res) => {
    try {
        const { courseId, title, totalMarks, Questions } = req.body;

        if (!courseId || !title || !totalMarks || !Questions) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        const newQuiz = new Quiz({
            courseId,
            title,
            totalMarks,
            Questions
        });

        const savedQuiz = await newQuiz.save();

        res.status(201).json({
            success: true,
            data: savedQuiz,
            message: 'Quiz created successfully'
        });
    } catch (error) {
        console.log("error = ", error.message)
        res.status(500).json({
            success: false,
            message: 'Failed to create quiz',
            error: error.message
        });
    }
};

// Get all quizzes
const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('courseId');
        
        res.status(200).json({
            success: true,
            count: quizzes.length,
            data: quizzes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch quizzes',
            error: error.message
        });
    }
};

// Get quizzes by course ID
const getQuizzesByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        
        const quizzes = await Quiz.find({ courseId }).populate('courseId');
        
        res.status(200).json({
            success: true,
            count: quizzes.length,
            data: quizzes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch quizzes for this course',
            error: error.message
        });
    }
};

// Get a single quiz by ID
const getQuizById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const quiz = await Quiz.findById(id).populate('courseId');
        
        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: 'Quiz not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: quiz
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch quiz',
            error: error.message
        });
    }
};

// Update a quiz
const updateQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, totalMarks, Questions } = req.body;
        
        const quiz = await Quiz.findById(id);
        
        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: 'Quiz not found'
            });
        }
        
        const updatedQuiz = await Quiz.findByIdAndUpdate(
            id,
            { title, totalMarks, Questions },
            { new: true, runValidators: true }
        );
        
        res.status(200).json({
            success: true,
            data: updatedQuiz,
            message: 'Quiz updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update quiz',
            error: error.message
        });
    }
};

// Delete a quiz
const deleteQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        
        const quiz = await Quiz.findById(id);
        
        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: 'Quiz not found'
            });
        }
        
        await Quiz.findByIdAndDelete(id);
        
        res.status(200).json({
            success: true,
            message: 'Quiz deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete quiz',
            error: error.message
        });
    }
};

// Add a new question to a quiz
const addQuestionToQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, options, correctOption } = req.body;
        
        if (!question || !options || !correctOption) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields for the question'
            });
        }
        
        const quiz = await Quiz.findById(id);
        
        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: 'Quiz not found'
            });
        }
        
        quiz.Questions.push({
            question,
            options,
            correctOption
        });
        
        // Update the total marks if needed
        // You might want to adjust this based on your business logic
        quiz.totalMarks = quiz.Questions.length;
        
        await quiz.save();
        
        res.status(200).json({
            success: true,
            data: quiz,
            message: 'Question added to quiz successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to add question to quiz',
            error: error.message
        });
    }
};

// Remove a question from a quiz
const removeQuestionFromQuiz = async (req, res) => {
    try {
        const { quizId, questionId } = req.params;
        
        const quiz = await Quiz.findById(quizId);
        
        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: 'Quiz not found'
            });
        }
        
        // Filter out the question to remove
        quiz.Questions = quiz.Questions.filter(
            q => q._id.toString() !== questionId
        );
        
        // Update the total marks if needed
        // You might want to adjust this based on your business logic
        quiz.totalMarks = quiz.Questions.length;
        
        await quiz.save();
        
        res.status(200).json({
            success: true,
            data: quiz,
            message: 'Question removed from quiz successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to remove question from quiz',
            error: error.message
        });
    }
};

module.exports = {
    createQuiz,
    getAllQuizzes,
    getQuizzesByCourse,
    getQuizById,
    updateQuiz,
    deleteQuiz,
    addQuestionToQuiz,
    removeQuestionFromQuiz
};