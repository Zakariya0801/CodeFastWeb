const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    name: {
        type: String, 
        required: true
    },
    totalMarks: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
