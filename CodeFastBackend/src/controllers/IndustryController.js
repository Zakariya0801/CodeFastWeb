const Industry = require('../models/IndustryModel');
const bcrypt = require('bcryptjs');

const createIndustry = async (req, res) => {
    try {
        const { name, description, email, password, picture } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const industry = new Industry({ name, description, email, password: hashedPassword, picture });
        await industry.save();
        res.status(201).json({ message: 'Industry created successfully', industry });
    } catch (error) {
        res.status(400).json({ message: 'Error creating industry', error });
    }
}

const getAllIndustries = async (req, res) => {
    try {
        const industries = await Industry.find();
        res.status(200).json({ industries });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching industries', error });
    }
}

const getIndustryById = async (req, res) => {
    try {
        const { id } = req.params;
        const industry = await Industry.findById(id);
        if (!industry) {
            return res.status(404).json({ message: 'Industry not found' });
        }
        res.status(200).json({ industry });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching industry', error });
    }
}

const updateIndustry = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, email, password, picture } = req.body;
        const industry = await Industry.findByIdAndUpdate(id, { name, description, email, password, picture }, { new: true });
        if (!industry) {
            return res.status(404).json({ message: 'Industry not found' });
        }
        res.status(200).json({ message: 'Industry updated successfully', industry });
    } catch (error) {
        res.status(400).json({ message: 'Error updating industry', error });
    }
}

const deleteIndustry = async (req, res) => {
    try {
        const { id } = req.params;
        const industry = await Industry.findByIdAndDelete(id);
        if (!industry) {
            return res.status(404).json({ message: 'Industry not found' });
        }
        res.status(200).json({ message: 'Industry deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting industry', error });
    }
}

module.exports = {
    createIndustry,
    getAllIndustries,
    getIndustryById,
    updateIndustry,
    deleteIndustry
};