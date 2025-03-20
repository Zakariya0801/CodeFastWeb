const mongoose = require('mongoose');

const SperformanceSchema = new mongoose.Schema({
    Student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    performance: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const performance = mongoose.model('PerformanceLog', SperformanceSchema);
module.exports = performance;