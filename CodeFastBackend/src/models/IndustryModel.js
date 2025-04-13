const mongoose = require('mongoose');

const industrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        maxlength: 250
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    status: {
            type: Number,
            default: 0, // 0: Not Registered, 1: Registered
            enum: [0, 1]
    },
    picture: {
            type: String,
            default: ''
    },
    Jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }]
}, { timestamps: true });

const Industry = mongoose.model('Industry', industrySchema);
module.exports = Industry;
