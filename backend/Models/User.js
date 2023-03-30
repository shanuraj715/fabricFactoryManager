const mongoose = require('mongoose')
const _validator = require('validator')

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 2,
        maxLength: 26,
        trim: true,
    },
    lastName: {
        type: String,
        minLength: 2,
        maxLength: 26,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 20,
        trim: true,
        unique: true,
        validate: {
            validator: function (value) {
                return value.length >= 1 && // length should be greater than 0
                    value.charAt(0).match(/[a-z]/i) && // matches for first character alphabetic
                    value.indexOf(' ') === -1 // check for no whitespace
            },
            message: `Please enter a valid username`,
        }
    },
    email: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 50,
        trim: true,
        unique: true,
        validate: {
            validator: function (value) {
                return _validator.isEmail(value)
            },
            message: `Please enter a valid email}`
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length > 0
            },
            message: `Please enter your password.`
        }
    },
    gstin: {
        type: String,
        trim: true,
        minLength: 10,
        maxLength: 20,
    },
    company: {
        type: String,
        trim: true,
        minLength: 2,
        maxLength: 100
    },
    mobile: {
        type: Number,
        trim: true,
        minLength: 10,
        maxLength: 10,
        unique: true,
    },
    accountStatus: {
        type: String,
        trim: true,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    }
})

const User = mongoose.model('User', schema)

module.exports = User