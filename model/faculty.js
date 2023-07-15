const mongoose = require('mongoose');

const facultySchema = mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    email :{
        type : String,
        required : true,
    },
    password :{
        type : String,
        required : true,
    },
    role: {
        type : String,
        required : true
    },
    student_id :{
        type :Array,
        ref: 'studentD',
        required : true,
    },
})
const faculty = mongoose.model('faculty',facultySchema);
module.exports = faculty;