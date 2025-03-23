const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 250
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    },
    category: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
