var mongoose = require(`mongoose`)
var Schema = mongoose.Schema

var QuestionSchema = new Schema({
    title: {
        type: String,
        required: [true, `title harus diisi`]
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

var Question = mongoose.model(`Question`, QuestionSchema)

module.exports = Question