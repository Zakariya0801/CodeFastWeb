const StudyMaterial = require('../models/StudyMaterialModel');

// Create a new study material
const createStudyMaterial = async (req, res) => {
    try {
        const { courseId, description, name, LinkURL, FilePath } = req.body;

        if (!courseId || !description || !name) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Check if study material with same name already exists
        const existingMaterial = await StudyMaterial.findOne({ name });
        if (existingMaterial) {
            return res.status(400).json({
                success: false,
                message: 'Study material with this name already exists'
            });
        }

        const newStudyMaterial = new StudyMaterial({
            courseId,
            description,
            name,
            LinkURL: LinkURL || [],
            FilePath: FilePath || []
        });

        const savedMaterial = await newStudyMaterial.save();

        res.status(201).json({
            success: true,
            data: savedMaterial,
            message: 'Study material created successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create study material',
            error: error.message
        });
    }
};

// Get all study materials
const getAllStudyMaterials = async (req, res) => {
    try {
        const materials = await StudyMaterial.find().populate('courseId');
        
        res.status(200).json({
            success: true,
            count: materials.length,
            data: materials
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch study materials',
            error: error.message
        });
    }
};

// Get study materials by course ID
const getStudyMaterialsByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        
        const materials = await StudyMaterial.find({ courseId }).populate('courseId');
        
        res.status(200).json({
            success: true,
            count: materials.length,
            data: materials
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch study materials for this course',
            error: error.message
        });
    }
};

// Get a single study material by ID
const getStudyMaterialById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const material = await StudyMaterial.findById(id).populate('courseId');
        
        if (!material) {
            return res.status(404).json({
                success: false,
                message: 'Study material not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: material
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch study material',
            error: error.message
        });
    }
};

// Update a study material
const updateStudyMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, name, LinkURL, FilePath } = req.body;
        
        const material = await StudyMaterial.findById(id);
        
        if (!material) {
            return res.status(404).json({
                success: false,
                message: 'Study material not found'
            });
        }
        
        // Check if study material with same name already exists (if name is being updated)
        if (name && name !== material.name) {
            const existingMaterial = await StudyMaterial.findOne({ name });
            if (existingMaterial) {
                return res.status(400).json({
                    success: false,
                    message: 'Study material with this name already exists'
                });
            }
        }
        
        const updatedMaterial = await StudyMaterial.findByIdAndUpdate(
            id,
            { description, name, LinkURL, FilePath },
            { new: true, runValidators: true }
        );
        
        res.status(200).json({
            success: true,
            data: updatedMaterial,
            message: 'Study material updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update study material',
            error: error.message
        });
    }
};

// Delete a study material
const deleteStudyMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        
        const material = await StudyMaterial.findById(id);
        
        if (!material) {
            return res.status(404).json({
                success: false,
                message: 'Study material not found'
            });
        }
        
        await StudyMaterial.findByIdAndDelete(id);
        
        res.status(200).json({
            success: true,
            message: 'Study material deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete study material',
            error: error.message
        });
    }
};

// Add a new URL link to study material
const addLinkToStudyMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        const { link } = req.body;
        
        if (!link) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a link URL'
            });
        }
        
        const material = await StudyMaterial.findById(id);
        
        if (!material) {
            return res.status(404).json({
                success: false,
                message: 'Study material not found'
            });
        }
        
        material.LinkURL.push(link);
        await material.save();
        
        res.status(200).json({
            success: true,
            data: material,
            message: 'Link added to study material successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to add link to study material',
            error: error.message
        });
    }
};

// Remove a URL link from study material
const removeLinkFromStudyMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        const { linkIndex } = req.body;
        
        if (linkIndex === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a link index to remove'
            });
        }
        
        const material = await StudyMaterial.findById(id);
        
        if (!material) {
            return res.status(404).json({
                success: false,
                message: 'Study material not found'
            });
        }
        
        if (linkIndex < 0 || linkIndex >= material.LinkURL.length) {
            return res.status(400).json({
                success: false,
                message: 'Invalid link index'
            });
        }
        
        material.LinkURL.splice(linkIndex, 1);
        await material.save();
        
        res.status(200).json({
            success: true,
            data: material,
            message: 'Link removed from study material successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to remove link from study material',
            error: error.message
        });
    }
};

// Add a new file path to study material
const addFileToStudyMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        const { filePath } = req.body;
        
        if (!filePath) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a file path'
            });
        }
        
        const material = await StudyMaterial.findById(id);
        
        if (!material) {
            return res.status(404).json({
                success: false,
                message: 'Study material not found'
            });
        }
        
        material.FilePath.push(filePath);
        await material.save();
        
        res.status(200).json({
            success: true,
            data: material,
            message: 'File added to study material successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to add file to study material',
            error: error.message
        });
    }
};

// Remove a file path from study material
const removeFileFromStudyMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        const { fileIndex } = req.body;
        
        if (fileIndex === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a file index to remove'
            });
        }
        
        const material = await StudyMaterial.findById(id);
        
        if (!material) {
            return res.status(404).json({
                success: false,
                message: 'Study material not found'
            });
        }
        
        if (fileIndex < 0 || fileIndex >= material.FilePath.length) {
            return res.status(400).json({
                success: false,
                message: 'Invalid file index'
            });
        }
        
        material.FilePath.splice(fileIndex, 1);
        await material.save();
        
        res.status(200).json({
            success: true,
            data: material,
            message: 'File removed from study material successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to remove file from study material',
            error: error.message
        });
    }
};

module.exports = {
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
};