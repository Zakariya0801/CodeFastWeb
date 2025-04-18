const mongoose = require('mongoose');

const courseRegistrationSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Student'
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    status: {
        type: Number,
        default: 0, // 0 = Not approved, 1 = Approved
        enum: [0, 1]
    }
}, { timestamps: true });

courseRegistrationSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

const CourseRegistration = mongoose.model('CourseRegistration', courseRegistrationSchema);
module.exports = CourseRegistration;
