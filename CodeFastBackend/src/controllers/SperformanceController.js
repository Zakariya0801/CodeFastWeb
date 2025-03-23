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

module.exports = {
    addPerformanceLog,
    getPerformanceLogs
};
