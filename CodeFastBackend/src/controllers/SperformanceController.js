const PerformanceLog = require('../models/SPerformanceLog');
const Student = require('../models/UserModel');
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

        return logs.length > 0 ? logs : []; // Ensures an array is returned
    } catch (error) {
        console.error('Error fetching performance logs:', error.message);
        return [{message:'No Performance Log Found3'}];
    }
};

module.exports = {
    addPerformanceLog,
    getPerformanceLogs
};
