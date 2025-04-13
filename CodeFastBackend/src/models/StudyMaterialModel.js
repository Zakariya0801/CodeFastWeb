const mongoose = require('mongoose');

const studyMaterialSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    description: {
        type: String,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    LinkURL: [{
        type: String
    }],
    FilePath: [{
        type: String
    }]
}, { timestamps: true });

const StudyMaterial = mongoose.model('StudyMaterial', studyMaterialSchema);
module.exports = StudyMaterial;
