const express = require('express');
const router = express.Router();
const suggestionController = require('../controllers/SuggestionController');

// Routes
router.post('/', suggestionController.createSuggestion);          // Create suggestion
router.get('/', suggestionController.getAllSuggestions);          // Get all suggestions
router.get('/:id', suggestionController.getSuggestionById);       // Get suggestion by ID
router.delete('/:id', suggestionController.deleteSuggestionById); // Delete suggestion by ID
router.delete('/', suggestionController.deleteAllSuggestions);    // Delete all suggestions

module.exports = router;
