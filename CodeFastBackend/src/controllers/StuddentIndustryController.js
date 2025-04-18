const StudentIndustry = require('../models/Student-IndustryModel');


const getAllStudentIndustry = async (req, res) => {
    try {
        const filters = req.query;
        const relations = await StudentIndustry.find(filters)
            .populate('studentId', 'name email')
            .populate('jobId', 'title company');
        res.status(200).json(relations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getStudentIndustryById = async (req, res) => {
    try {
        const { studentId, jobId } = req.params;
        const relation = await StudentIndustry.findOne({ studentId, jobId })
            .populate('studentId', 'name email')
            .populate('jobId', 'title company');

        if (!relation) return res.status(404).json({ message: 'Relation not found' });
        res.status(200).json(relation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const applyJob = async (req, res) => {
    try {
        const { studentId, jobId } = req.body;

        const existing = await StudentIndustry.findOne({ studentId, jobId });
        if (existing) return res.status(400).json({ message: 'Already applied or approached' });

        const newApplication = new StudentIndustry({
            studentId,
            jobId,
            request: 0,
            status: 0
        });

        await newApplication.save();
        res.status(201).json({ message: 'Applied successfully', data: newApplication });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const approachStudent = async (req, res) => {
    try {
        const { studentId, jobId } = req.body;

        const existing = await StudentIndustry.findOne({ studentId, jobId });
        if (existing) return res.status(400).json({ message: 'Already exists' });

        const newApproach = new StudentIndustry({
            studentId,
            jobId,
            request: 1,
            status: 0
        });

        await newApproach.save();
        res.status(201).json({ message: 'Industry approached student', data: newApproach });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { studentId, jobId } = req.params;
        const { status } = req.body;

        const updated = await StudentIndustry.findOneAndUpdate(
            { studentId, jobId },
            { status },
            { new: true }
        );

        if (!updated) return res.status(404).json({ message: 'Relation not found' });
        res.status(200).json({ message: 'Status updated', data: updated });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteStudentIndustry = async (req, res) => {
    try {
        const { studentId, jobId } = req.params;

        const deleted = await StudentIndustry.findOneAndDelete({ studentId, jobId });
        if (!deleted) return res.status(404).json({ message: 'Relation not found' });

        res.status(200).json({ message: 'Deleted successfully', data: deleted });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllStudentIndustry,
    getStudentIndustryById,
    applyJob,
    approachStudent,
    updateStatus,
    deleteStudentIndustry
};
