const Job = require('../models/JobModel');
const StudentIndustry = require('../models/Student-IndustryModel');

const createJob = async (req, res) => {
    try {
        const { title, description, location, salary, status} = req.body;
        if (!title || !description || !location || !salary) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const industryId = req.user._id;
        const job = new Job({
            title,
            description,
            location,
            salary,
            status,
            industry: industryId
        });
        await job.save();
        res.status(201).json({...job._doc, appliedStudents: []});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getJobs = async (req, res) => {
    try {
        const industryId = req.user._id;
        const jobs = await Job.find({ industry: industryId }).populate('industry', 'name');
        const studentIndustries = await StudentIndustry.find({ industryId, status: 1 });

        const finalJobs = jobs.map(job => {
            const appliedStudents = studentIndustries.filter(studentIndustry => studentIndustry.jobId.toString() === job._id.toString()).map(studentIndustry => studentIndustry.studentId);
            return {
                ...job.toObject(),
                appliedStudents: appliedStudents,
            };
        })

        res.status(200).json(finalJobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findByIdAndDelete(id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, location, salary } = req.body;
        const job = await Job.findByIdAndUpdate(id, { title, description, location, salary }, { new: true });
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createJob,
    getJobs,
    deleteJob,
    updateJob
}