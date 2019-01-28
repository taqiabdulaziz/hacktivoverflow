var mongoose = require(`mongoose`)
var Schema = mongoose.Schema

var QuestionSchema = new Schema({
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

var Question = mongoose.model(`Question`, QuestionSchema)

module.exports = Question