const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Student = require('./User');
const Subject = require('./Subject');

const assessmentSchema = new Schema({
    student: {                     // Only users with roles-> 3456
        type: Schema.Types.ObjectId,
        ref: Student,
        required: true
    },            
    assessmentScores: [{
        subject: {
            type: Schema.Types.ObjectId,
            ref: Subject,
            required: true
        },
        weekArray: [{
            weekNo: {
                type: Number,
                required: true,
            },
            attendanceScore: {
                type: Number,
                max: 5,
                required: true
            },
            interactionScore: {
                type: Number,
                max: 5,
                required: true
            },
            testScore: {
                type: Number,
                max: 100,
                required: true
            }
        }]
    }]
})

module.exports = mongoose.model('Assessment', assessmentSchema)