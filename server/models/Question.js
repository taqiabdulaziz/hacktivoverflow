var mongoose = require(`mongoose`)
var Answer = require(`../models/Answer`)
var Schema = mongoose.Schema

var QuestionSchema = new Schema({
    title: {
        type: String,
        required: [true, `title harus diisi`]
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, `userId harus diisi`]
    },
    description: {
        type: String,
        required: [true, `description harus diisi`]
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
})

QuestionSchema.post(`findOneAndDelete`, function (doc, next) {
    Answer.findOneAndDelete({
        question: doc._id
    }).then((result) => {
        next()
    }).catch((err) => {
        console.log(err);
        
    });
})

var Question = mongoose.model(`Question`, QuestionSchema)

module.exports = Question