const Student = require('../models/UserModel'); // Ensure correct path
const Admin = require('../models/AdminModel');
const Industry = require('../models/IndustryModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {addPerformanceLog} = require('./SperformanceController')
const register = async (req, res) => {
    try {
        const { name,email, dob, university, 
                password, cgpa, degree, profile_photo } = req.body;
        const studentExists = await Student.findOne({ email });
        if (studentExists) return res.status(400).json({ message: 'Student already exists' });
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
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await Student.findOne({ email });
        let role;
        if (!user){
            user = await Admin.findOne({ email });
            if(!user){
                user = await Industry.findOne({email});
                if(!user) return res.status(400).json({ message: 'User does not exist' });
                else{
                    role = 'Industry';
                }
            }
            else{
                role = 'Admin';
            }
        }
        else{
            role = 'Student';
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshtoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
        });
        res.json({ token, user, role });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { register, login };