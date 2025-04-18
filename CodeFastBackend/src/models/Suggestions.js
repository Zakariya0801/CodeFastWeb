const mongoose = require ('mongoose');
const SuggestionSchema = new mongoose.Schema ({
    Email: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    Suggestion: {
        type: String,
        required: true
    }
},{ timestamps: true });

const Suggestion = mongoose.model ('Suggestion', SuggestionSchema);
module.exports = Suggestion;

