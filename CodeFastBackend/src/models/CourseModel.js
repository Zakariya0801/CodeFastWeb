const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 250
    },
    Quizes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    }]
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
