const express = require('express');
const router = express.Router();
const {
    createStudyMaterial,
    getAllStudyMaterials,
    getStudyMaterialsByCourse,
    getStudyMaterialById,
    updateStudyMaterial,
    deleteStudyMaterial,
    addLinkToStudyMaterial,
    removeLinkFromStudyMaterial,
    addFileToStudyMaterial,
    removeFileFromStudyMaterial
} = require('../controllers/StudyMaterialController');

// Base routes
router.route('/')
    .post(createStudyMaterial)
    .get(getAllStudyMaterials);

// Routes for specific study material
router.route('/:id')
    .get(getStudyMaterialById)
    .put(updateStudyMaterial)
    .delete(deleteStudyMaterial);

// Course-specific routes
router.route('/course/:courseId')
    .get(getStudyMaterialsByCourse);

// Link management routes
router.route('/:id/links')
    .post(addLinkToStudyMaterial)
    .delete(removeLinkFromStudyMaterial);

// File management routes
router.route('/:id/files')
    .post(addFileToStudyMaterial)
    .delete(removeFileFromStudyMaterial);

module.exports = router;