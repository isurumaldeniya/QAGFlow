const express = require('express');
const router = express.Router();
const Question = require('../models/question');
const config = require('../config/database');

//post question
router.post('/postquestion', (req, res, next) => {
    let newQuestion = new Question({
        title: req.body.title,
        content: req.body.content
    });

    Question.addQuestion(newQuestion, (err, question) => {
        if (err) {
            res.json({ success: false, msg: 'Faild to post the question' });
        } else {
            res.json({ success: true, msg: 'Question Posted' });
        }
    })
});

router.post('/getquestion', (req, res, next) => {

    let title = req.body.title;

    Question.getManyQuestionsByTitle(title, (err, question) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Faild to get the question'
            });
        } else {
            res.json({
                success: true,
                msg: "Question fetches successfully",
                question: question
            });
        }
    })
});

router.get('/getRandomQuestions', (req, res, next) => {

    Question.getRandomQuestions((err, questions) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Faild to get the question'
            });
        } else {
            res.json({
                success: true,
                msg: "Question fetches successfully",
                question: questions
            });
        }
    })
});

module.exports = router;