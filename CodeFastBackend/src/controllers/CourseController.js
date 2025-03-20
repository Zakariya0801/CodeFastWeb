const Course = require('../models/CourseModel.js');

const getAllCourse = async (req, res) => {
    try{
        const course= await Course.find();
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

const AddQuizesInCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        const {QuizID} = req.body;
        if(course.Quizes.includes(QuizID)) return res.status(401).json({ message: 'Quiz Already in Course' });
        else {
            course.Quizes.push(QuizID);
            await course.save();
            res.status(200).json(course);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const AddCourse = async (req,res) => {
    try {
        const {name, description} = req.body;
        const course = new Course({
            name,
            description
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
    AddQuizesInCourse,
    AddCourse
};