const Evaluation = require('../models/EvaluationModel');
const Quiz = require('../models/QuizModel.js');
const Student = require('../models/UserModel.js');
const { addPerformanceLog,getPerformanceLogs } = require('./SperformanceController');
const createStudentEvaluation = async (req, res) => {
    try {
        const { quizId, score } = req.body;
        const studentId = req.user._id;

        // Fetch Student and Quiz
        const student = await Student.findById(studentId);
        const quiz = await Quiz.findById(quizId);

        if (!student) return res.status(404).json({ message: 'Student not found' });
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        // Save Evaluation
        const evaluation = new Evaluation({ studentId, quizId, score });
        await evaluation.save();

        // Calculate new performance
        let newPerformance = (score / quiz.totalMarks) * 4.0;
        await addPerformanceLog(studentId, newPerformance);

        // Get Performance Logs
        const LogArray = await getPerformanceLogs(studentId) || []; // Ensure it's always an array

        // Calculate the new student performance
        let sum = 0;
        for (const log of LogArray) {
            sum += log.performance;
        }
        let count = LogArray.length;
        let updatedPerformance = count > 0 ? sum / count : 0; // Prevent division by zero

        // Update Student's Performance
        student.sPerformance = updatedPerformance;
        await student.save();

        return res.status(201).json({ message: 'Evaluation created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getStudentEvaluation = async (req, res) => {
    try {
        const studentId = req.user._id;
        const evaluations = await Evaluation.find({ studentId });
        res.status(200).json({ evaluations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {createStudentEvaluation, getStudentEvaluation};
    
