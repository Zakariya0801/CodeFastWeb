const PerformanceLog = require('../models/SPerformanceLog');
const Student = require('../models/UserModel');
const CourseRegistration = require('../models/CourseRegistrationModel');
const mongoose = require('mongoose');
const addPerformanceLog = async (Student_id, performance) => {
    try {
        const student = await Student.findById(Student_id);
        if (!student) {
            console.error('Student not found');
            return;
        }

        const newLog = new PerformanceLog({
            Student_id,
            performance
        });

        await newLog.save();
        console.log('Performance log added successfully');
    } catch (error) {
        console.error('Error adding performance log:', error.message);
    }
};


const getPerformanceLogs = async (Student_id) => {
    try {
        const student = await Student.findById(Student_id);
        if (!student) {
            console.error('Student not found');
            return [{message:'No Performance Log Found2'}];
        }

        // Ensure the query uses the correct field name
        const logs = await PerformanceLog.find({ Student_id: Student_id }).sort({ createdAt: -1 });
        const latestLogs = new Map();

        logs.forEach(log => {
        const date = new Date(log.createdAt).toLocaleString("en-US", { 
            year: "numeric", 
            month: "2-digit", 
            day: "2-digit", 
            hour: "2-digit", 
            minute: "2-digit", 
            second: "2-digit", 
            hour12: false 
        }).replace(",", ""); // Extract YYYY-MM-DD
        // if (!latestLogs.has(date) || new Date(log.createdAt) > new Date(latestLogs.get(date).createdAt)) {
            latestLogs.set(date, log); // Store the latest log for that date
        // }
        });

        const formattedLogs = Array.from(latestLogs.values()).map(log => ({
        date: new Date(log.createdAt).toLocaleString("en-US", { 
            year: "numeric", 
            month: "2-digit", 
            day: "2-digit", 
            hour: "2-digit", 
            minute: "2-digit", 
            second: "2-digit", 
            hour12: false 
        }).replace(",", ""), // Extracts day of the month
        performance: log.performance
        }));
        return formattedLogs.length > 0 ? formattedLogs : []; // Ensures an array is returned
    } catch (error) {
        console.error('Error fetching performance logs:', error.message);
        return [{message:'No Performance Log Found3'}];
    }
};
const getLeaderboard = async (req, res) => {
    try {
        const allStudents = await Student.find({}).sort({ sPerformance: -1 }).populate('university', 'name');
        const courseRegistrations = await CourseRegistration.find({}).populate('courseId', 'name');

        const leaderboard = allStudents.map(student => ({
            _id: student._id,
            name: student.name,
            cgpa: student.cgpa,
            sPerformance: student.sPerformance,
            university: student.university ? student.university.name : 'N/A',
            picture: student.picture || 'default.jpg', // Provide a default picture if none exists
            courses: courseRegistrations.filter(reg => reg.studentId.toString() === student._id.toString()).map(reg => reg.courseId.name),
        }));
        res.status(200).json(leaderboard);
    } catch (error) {
        console.log("error = ", error.message);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addPerformanceLog,
    getPerformanceLogs,
    getLeaderboard
};
