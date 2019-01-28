var express = require('express');
var router = express.Router();
var userController = require(`../controllers/userController`)

router.post(`/`, userController.create)
router.post(`/login`, userController.login)


module.exports = router;
