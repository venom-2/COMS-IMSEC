const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({ 
    studentId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Student',
        required: true
    },
    ct : {
        type: Number,
        required: true
    },
    rollNumber: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    subject : {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    marks: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('Marks', marksSchema);