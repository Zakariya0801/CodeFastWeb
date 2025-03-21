const Student = require('../models/UserModel'); // Ensure correct path
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {addPerformanceLog} = require('./SperformanceController')
const register = async (req, res) => {
    try {
        const { name,email, dob, university, 
                password, cgpa, degree, profile_photo } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const student = new Student({
            name,
            password: hashedPassword,
            cgpa,
            degree,
            email,
            dob,
            university,
            picture: profile_photo
        });
        await student.save();
        await addPerformanceLog(student._id, 0);
        res.status(201).json({ message: 'Student registered successfully', student });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await Student.findOne({ email });
        if (!student) return res.status(404).json({ message: 'Student not found' });

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshtoken = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
        });
        res.json({ token, student });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { register, login };