var mongoose = require(`mongoose`)
var Schema = mongoose.Schema
var helpers = require(`../helpers/helpers`)

var UserSchema = new Schema({
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return User.findOne({
                    email: v
                }).then((result) => {
                    if (result) {
                        throw `Email sudah ada`
                    }
                }).catch((err) => {
                    throw err
                });
            }
        },
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.pre(`save`, function (next) {
    this.password = helpers.hash(this.password)
    next()
})

var User = mongoose.model(`User`, UserSchema)

module.exports = User