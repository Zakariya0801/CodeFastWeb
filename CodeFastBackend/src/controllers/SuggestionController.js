const Suggestion = require('../models/Suggestions');

// Create a new suggestion
const createSuggestion = async (req, res) => {
    try {
        const { email: Email, type: Type, description: suggestionText } = req.body;
        console.log("Suggestion data:", req.body);
        if (!Email || !Type || !suggestionText) {
            return res.status(400).json({
                success: false,
                message: 'Please provide Email, Type, and Suggestion content'
            });
        }

        const newSuggestion = new Suggestion({
            Email,
            Type,
            Suggestion: suggestionText
        });

        const savedSuggestion = await newSuggestion.save();

        res.status(201).json({
            success: true,
            data: savedSuggestion,
            message: 'Suggestion submitted successfully'
        });
    } catch (error) {
        console.error("Error creating suggestion:", error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to submit suggestion',
            error: error.message
        });
    }
};

// Get all suggestions
const getAllSuggestions = async (req, res) => {
    try {
        const suggestions = await Suggestion.find();

        res.status(200).json({
            success: true,
            count: suggestions.length,
            data: suggestions
        });
    } catch (error) {
        console.error("Error fetching suggestions:", error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch suggestions',
            error: error.message
        });
    }
};

// Get suggestion by ID
const getSuggestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const suggestion = await Suggestion.findById(id);

        if (!suggestion) {
            return res.status(404).json({
                success: false,
                message: 'Suggestion not found'
            });
        }

        res.status(200).json({
            success: true,
            data: suggestion
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch suggestion',
            error: error.message
        });
    }
};

// Delete suggestion by ID
const deleteSuggestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const suggestion = await Suggestion.findByIdAndDelete(id);

        if (!suggestion) {
            return res.status(404).json({
                success: false,
                message: 'Suggestion not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Suggestion deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete suggestion',
            error: error.message
        });
    }
};

// Delete all suggestions
const deleteAllSuggestions = async (req, res) => {
    try {
        await Suggestion.deleteMany();
        res.status(200).json({
            success: true,
            message: 'All suggestions have been deleted'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete all suggestions',
            error: error.message
        });
    }
};

module.exports = {
    createSuggestion,
    getAllSuggestions,
    getSuggestionById,
    deleteSuggestionById,
    deleteAllSuggestions
};
