const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    cgpa: {
        type: Number,
        min: 0.0,
        max: 4.0,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    sPerformance: {
        type: Number,
        min: 0.0,
        max: 4.0
    },
    subscribedPlan: {
        type: Number,
        default: -1, // -1: Not subscribed, 1: Subscribed
        enum: [-1, 1]
    },
    picture: {
        type: String,
        default: ''
    },
    Jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }],
}, { timestamps: true });

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;