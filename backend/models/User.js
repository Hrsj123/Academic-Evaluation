const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validator = require('validator');         // For e-mail verification!    

const userSchema = new Schema({         // User: Teacher, Student
    firstName: {
        type: String,
        required: true,
        minlength: 3
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3
    },
    username: {
        type: String,
        unique: true,
        default: function() {
            return `${this.firstName.slice(0, 3)}${this.lastName.slice(0, 3)}_${String(this._id).slice(-4)}`
        },
    },
    roles: [Number],
    email: {
        type: String,
        validate: {
            validator: validator.isEmail,
            message: 'This format is not a valid email!',
            isAsync: false
        }
    },
    phoneNo: {
        type: Number,
        min: 1000000000,
        max: 9999999999
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: [String]    
})

module.exports = mongoose.model('user', userSchema)