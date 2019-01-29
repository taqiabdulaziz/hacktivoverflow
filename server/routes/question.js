var express = require('express');
var router = express.Router();
var questionController = require(`../controllers/questionController`)

router.post(`/`, questionController.create)
router.post(`/:questionId/upvote`, questionController.upvote)
router.post(`/:questionId/downvote`, questionController.downvote)
router.get(`/`, questionController.findAll)
router.get(`/:questionId`, questionController.findOne)
router.get(`/answer/:questionId`, questionController.findAnswer)

module.exports = router;
