const Course = require('../models/CourseModel.js');

const getAllCourse = async (req, res) => {
    try{
        const course= await Course.find().populate("instructor");
        if (!Course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getCoursebyId = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const AddCourse = async (req,res) => {
    try {
        const {name,
            subtitle,
            description,
            instructor,
            category,
        } = req.body;
        const course = new Course({
            name,
            description,
            subtitle,
            instructor,
            category
        });
        await course.save();
        res.status(200).json({message: 'Course Added Succesfully',course});
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    getAllCourse,
    getCoursebyId,
    AddCourse
};