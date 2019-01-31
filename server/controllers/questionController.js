var Question = require(`../models/Question`)
var Answer = require(`../models/Answer`)
var { ObjectId } = require(`mongoose`).Schema.Types

// {
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     upvotes: [{
//         type: Schema.Types.ObjectId,
//         ref: 'User'
//     }],
//     downvotes: [{
//         type: Schema.Types.ObjectId,
//         ref: 'User'
//     }],
// }

module.exports = {
    create: function (req, res) {
        Question.create({
            title: req.body.title,
            description: req.body.description,
            userId: req.body.userId
        }).then((result) => {
            res.status(201).json(result)
        }).catch((err) => {
            res.status(500).json({ msg: `internal server error`, err: err })
        });
    },
    upvote: function (req, res) {
        Question.findOne({
            _id: req.params.questionId
        }).then((result) => {
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
        Question.findOne({
            _id: req.params.questionId
        }).then((result) => {
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
    findAll: function (req, res) {
        Question.find({})
            .then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                res.status(500).json({ msg: `internal server error`, err: err })
            });
    },
    findOne: function (req, res) {
        Question.findOne({ _id: req.params.questionId })
            .then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                res.status(500).json({ msg: `internal server error`, err: err })
            });
    },
    findAnswer: function (req, res) {
        Answer.find({ question: req.params.questionId }).populate(`question`)
            .then((result) => {
                console.log(`=================`);
                
                console.log(result);
                res.status(200).json(result)
            }).catch((err) => {
                res.status(500).json({ msg: `internal server error`, err: err })
            });
    },
    findMyQuestions: function (req, res) {
        //
    },
    delete: function (req, res) {
        Question.findOneAndDelete({
            _id: req.params.questionId
        }).then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json({ msg: `internal server error`, err: err })
        });
    },
    update: function (req, res) {
        Question.findOneAndUpdate({
            _id: req.params.questionId
        }, req.body, {
            new: true
        })
            .then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                res.status(500).json({msg: `internal server error`, err: err})
            });
    }
};
