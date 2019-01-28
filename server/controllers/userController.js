var helpers = require(`../helpers/helpers`)
var jwt = require(`jsonwebtoken`)
var User = require(`../models/User`)

module.exports = {
    create: function (req, res) {
        User.create({
            email: req.body.email,
            password: req.body.password
        }).then((result) => {
            res.status(201).json(result)
        }).catch((err) => {
            res.status(500).json({ msg: `internal server error`, err: err })
        });
    },
    login: function (req, res) {
        User.findOne({
            email: req.body.email
        }).then((result) => {
            if (!result) {
                res.status(404).json({ msg: `email/password salah` })
            } else {
                if (helpers.compare(req.body.password, result.password)) {
                    jwt.sign({
                        id: result._id,
                        email: req.body.email
                    }, process.env.JWT_SECRET, function (err, encoded) {
                        if (err) {
                            res.status(401).json({ msg: `jwt malformed`, err: err.data })
                        } else {
                            res.status(200).json({
                                id: result._id,
                                email: result.email,
                                token: encoded
                            })
                        }
                    })
                } else {
                    res.status(404).json({ msg: `email/password salah` })
                }
            }
        }).catch((err) => {
            console.log(err);

            res.status(500).json({ msg: `internal server error`, err: err.data })
        });
    }
};
