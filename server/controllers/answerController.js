var Answer = require(`../models/Answer`)

module.exports = {
    create: function (req, res) {
        Answer.create({
            title: req.body.title,
            question: req.body.question,
            userId: req.body.userId
        }).then((result) => {
            var populatedAnswer = result.populate(`userId`).populate(`question`).execPopulate()
            populatedAnswer.then((ans) => {
                res.status(201).json(ans)
            })
        }).catch((err) => {
            res.status(500).json({ msg: `internal server error`, err: err })
        });
    },
    upvote: function (req, res) {
        Answer.findOne({
            _id: req.params.answerId
        }).populate('userId').then((result) => {
            var alreadyUpVote = result.upvotes.indexOf(req.body.userId) == -1 ? false : true
            var alreadyDownVote = result.downvotes.indexOf(req.body.userId) == -1 ? false : true

            if (alreadyUpVote) {
                throw 'Kamu sudah vote'
            } else {
                if (alreadyDownVote) {
                    result.downvotes.splice(result.downvotes.indexOf(req.body.userId), 1)
                    result.upvotes.push(req.body.userId)
                    res.status(201).json(result)
                } else {
                    result.upvotes.push(req.body.userId)
                    res.status(201).json(result)
                }
            }

            result.save()
        }).catch((err) => {
            res.status(401).json({ msg: err })
        });
    },
    downvote: function (req, res) {
        Answer.findOne({
            _id: req.params.answerId
        }).populate('userId').then((result) => {
            var alreadyUpVote = result.upvotes.indexOf(req.body.userId) == -1 ? false : true
            var alreadyDownVote = result.downvotes.indexOf(req.body.userId) == -1 ? false : true

            if (alreadyDownVote) {
                throw 'Kamu sudah downvote'
            } else {
                if (alreadyUpVote) {
                    result.upvotes.splice(result.downvotes.indexOf(req.body.userId), 1)
                    result.downvotes.push(req.body.userId)
                    res.status(201).json(result)
                } else {
                    result.downvotes.push(req.body.userId)
                    res.status(201).json(result)
                }
            }

            result.save()
        }).catch((err) => {
            res.status(401).json({ msg: err })
        });
    },
    update: function (req, res) {
        Answer.findOneAndUpdate({
            _id: req.params.answerId
        }, {
                title: req.body.title
            }, {
                new: true
            }).then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                res.status(500).json({ msg: `internal server error`, err: err })
            });
    },
    findMyAnswer: function (req, res) {
        Answer.find({
            userId: req.params.userId
        }).then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
    }
};
