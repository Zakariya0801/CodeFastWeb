const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

const University = mongoose.model('University', UniversitySchema);
module.exports = University;