const CourseRegistration = require('../models/CourseRegistrationModel');
const Course = require('../models/CourseModel');
const mongoose = require('mongoose');

/**
 * Add a new course registration
 * @route POST /api/registrations
 * @access Private - Student
 */
const addRegistration = async (req, res) => {
    try {
        const studentId = req.user._id;
        const { courseId } = req.body;

        if (!courseId) {
            return res.status(400).json({ message: 'Course ID is required' });
        }

        // Validate if courseId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ message: 'Invalid course ID format' });
        }

        // Check if course exists
        const courseExists = await Course.findById(courseId);
        if (!courseExists) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if registration already exists
        const existingRegistration = await CourseRegistration.findOne({ studentId, courseId });
        if (existingRegistration) {
            return res.status(400).json({ message: 'You are already registered for this course' });
        }

        // Create new registration
        const newRegistration = new CourseRegistration({
            studentId,
            courseId,
            status: 0 // Default to not approved
        });

        await newRegistration.save();

        res.status(201).json({
            success: true,
            data: newRegistration,
            message: 'Course registration submitted successfully'
        });
    } catch (error) {
        console.error('Error in addRegistration:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to register for course',
            error: error.message
        });
    }
};

/**
 * Get all registrations for the logged-in student
 * @route GET /api/registrations
 * @access Private - Student
 */
const getRegistrations = async (req, res) => {
    try {
        const studentId = req.user._id;
        
        // Optional query parameters
        const { status } = req.query;
        
        // Build query object
        const query = { studentId };
        
        // Add status filter if provided
        if (status !== undefined) {
            query.status = parseInt(status);
        }

        // Get registrations with course details
        const registrations = await CourseRegistration.find(query);
        res.status(200).json({
            success: true,
            count: registrations.length,
            data: registrations
        });
    } catch (error) {
        console.error('Error in getRegistrations:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch course registrations',
            error: error.message
        });
    }
};

/**
 * Delete a course registration
 * @route DELETE /api/registrations/:id
 * @access Private - Student
 */
const deleteRegistration = async (req, res) => {
    try {
        const studentId = req.user._id;
        const courseId = req.body.courseId;

       

        // Find the registration
        const registration = await CourseRegistration.findOne({courseId: courseId, studentId});
        
        // Check if registration exists
        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }
        
        // Verify that the registration belongs to the logged-in student
        if (registration.studentId.toString() !== studentId.toString()) {
            return res.status(403).json({ message: 'Unauthorized: You can only delete your own registrations' });
        }

        

        // Delete the registration
        await CourseRegistration.findByIdAndDelete(registration._id);

        res.status(200).json({
            success: true,
            message: 'Course registration deleted successfully'
        });
    } catch (error) {
        console.error('Error in deleteRegistration:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete course registration',
            error: error.message
        });
    }
};

module.exports = {
    addRegistration,
    getRegistrations,
    deleteRegistration
};