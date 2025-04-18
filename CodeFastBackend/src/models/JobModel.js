const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['OPEN', 'CLOSED'],
        default: 'OPEN'
    },
    salary: {
        type: Number,
        required: true
    },
    industry: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Industry',
    }
}, { timestamps: true });

const Quiz = mongoose.model('Job', jobSchema);
module.exports = Quiz;
