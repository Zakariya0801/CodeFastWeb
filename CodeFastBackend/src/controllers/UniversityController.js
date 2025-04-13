const University = require('../models/UniversityModel');

const addUniversity = async (req, res) => {
    try {
        const { name } = req.body;
        const university = new University({
            name,
        });
        await university.save();
        res.status(201).json({ message: 'University added successfully', university });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

const getAllUniversities = async (req, res) => {
    try {
        const universities = await University.find();
        res.json(universities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { addUniversity, getAllUniversities };