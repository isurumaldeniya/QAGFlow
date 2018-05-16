const mongoose = require('mongoose');
const config = require('../config/database');

const QuestionSchema = mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String,
        required: true
    },


});

const Question = module.exports = mongoose.model('Question', QuestionSchema);

module.exports.getQuestionByTitle = function(title, callback) {
    const query = { title: title }
    Question.findOne(query, callback);
}

module.exports.getManyQuestionsByTitle = function(title, callback) {
    const query = {
        title: title
    }
    Question.find(query, callback);
}

module.exports.getRandomQuestions = function(callback) {
    Question.find({}, callback).limit(5);
}

module.exports.addQuestion = function(newQuestion, callback) {
    newQuestion.save(callback);
}