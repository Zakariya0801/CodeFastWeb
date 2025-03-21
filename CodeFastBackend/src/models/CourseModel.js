const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
