const Student = require('../models/UserModel'); // Ensure correct path
const bcrypt = require('bcryptjs');


const getAllStudents = async (req, res) => {
    try {
        const student = await Student.find();
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getStudentbyId = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateStudent = async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteStudent = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const subscribePlan = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        student.subscribedPlan = 1;
        await student.save();
        res.status(200).json({ message: 'Subscribed successfully', student });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const applyJob = async (req, res) => {
    try {
        const { id, jobId } = req.params;
        const student = await Student.findById(id);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        student.Jobs.push({ job: jobId, status: 0 });
        await student.save();
        res.status(200).json({ message: 'Applied for job successfully', student });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const CurrentUser = async (req, res) => {
    try {
        console.log("hrerer")
        const user = req.user;
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({user});
    } catch (error) {
        console.log("error = ", error)
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllStudents,
    getStudentbyId,
    updateStudent,
    deleteStudent,
    subscribePlan,
    applyJob,
    CurrentUser
};