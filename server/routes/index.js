var express = require('express');
var router = express.Router();
var userRoutes = require(`../routes/users`)
var questionRoutes = require(`../routes/question`)
var answerRoutes = require(`../routes/answer`)
var m = require(`../middlewares/middlewares`)

router.use(`/users`, userRoutes)
router.use(`/questions`, m.auth, questionRoutes)
router.use(`/answers`, m.auth, answerRoutes)

module.exports = router;
