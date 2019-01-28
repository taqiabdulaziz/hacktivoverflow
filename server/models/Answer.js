var mongoose = require(`mongoose`)
var Schema = mongoose.Schema

var AnswerSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    upvotes: [{
        type: Number,
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    downvotes: [{
        type: Number,
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
})

var Answer = mongoose.model(`Answer`, AnswerSchema)

module.exports = Answer