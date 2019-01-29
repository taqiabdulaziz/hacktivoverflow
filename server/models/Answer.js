var mongoose = require(`mongoose`)
var Schema = mongoose.Schema

var AnswerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: `Question`
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

var Answer = mongoose.model(`Answer`, AnswerSchema)

module.exports = Answer