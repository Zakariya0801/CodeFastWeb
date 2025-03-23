const mongoose = require('mongoose');

const evaluateStudentQuizSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Student'
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Quiz'
    },
    score: {
        type: Number,
        required: true
    }
}, { timestamps: true });

evaluateStudentQuizSchema.index({ studentId: 1, quizId: 1 }, { unique: true });

const EvaluateStudentQuiz = mongoose.model('EvaluateStudentQuiz', evaluateStudentQuizSchema);
module.exports = EvaluateStudentQuiz;
