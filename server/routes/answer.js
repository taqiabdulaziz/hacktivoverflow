var express = require('express');
var router = express.Router();
var answerController = require(`../controllers/answerController`)

router.post(`/`, answerController.create)
router.post(`/:answerId/upvote`, answerController.upvote)
router.post(`/:answerId/downvote`, answerController.downvote)

module.exports = router;
