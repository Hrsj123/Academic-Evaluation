const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Student = require('./User');

const subjectSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    subjectCode: {
        type: String,
        unique: true,
        default: function() { 
            return `${this.title.slice(0, 3)}_${String(this._id).slice(-3)}` 
        },
    },
    description: {
        type: String,
        maxlength: 50
    },
    studentsEnrolled: [{                     // Only users with roles-> 3456
        type: Schema.Types.ObjectId,
        ref: Student
    }],            
    date: {
        type: Date,
        default: Date.now
    }                     
})

module.exports = mongoose.model('Subject', subjectSchema)