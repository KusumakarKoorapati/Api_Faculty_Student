const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const singlepath = '/singleimage';
const multipath = '/multiimage';

const StudentSchema = mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    gender :{
        type : String,
        required : true
    },
    hobby :{
        type : Array,
        required : true
    },
    city :{
        type : String,
        required : true
    },
    description :{
        type : String,
        required : true
    },
    Image :{
        type : String,
        required : true
    },
    multiImage :{
        type : Array,
        required : true
    }
})

const ImgUploade = multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file.fieldname == 'Image'){
            cb(null,path.join(__dirname,'..',singlepath));
        }else{
            cb(null,path.join(__dirname,'..',multipath));

        }
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
})

StudentSchema.statics.UpImage = multer({storage : ImgUploade}).fields([{name:'Image',maxCount:1},{name:'multiImage',maxCount:5}]);
StudentSchema.statics.singlepath = singlepath;
StudentSchema.statics.multipath = multipath;


const student = mongoose.model('student',StudentSchema);
module.exports = student;






