const mongoose = require('mongoose');

const studentIndustrySchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Student'
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Job'
    },
    request: {
        type: Number,
        default: -1, // -1 = Not applied, 0 = Student Applied, 1 = Industry Approached Student
        enum: [-1, 0, 1]
    },
    status: {
        type: Number,
        required: true, // 1 = Accepted, 0 = Pending, -1 = Rejected
        enum: [-1, 0, 1]
    }
}, { timestamps: true });

studentIndustrySchema.index({ studentId: 1, jobId: 1 }, { unique: true });

const StudentIndustry = mongoose.model('StudentIndustry', studentIndustrySchema);
module.exports = StudentIndustry;
