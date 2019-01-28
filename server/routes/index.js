var express = require('express');
var router = express.Router();
var userRoutes = require(`../routes/users`)

router.use(`/users`, userRoutes)

module.exports = router;
