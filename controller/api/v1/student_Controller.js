const faculty = require('../../../model/faculty');
const StudentD = require('../../../model/studentD');


module.exports.studentRegister = async(req,res)=>{
   try {
    req.body.role = 'student';
    let studentData = await StudentD.create(req.body);
    let facultyData = await faculty.findById(studentData.faculty_id);
    await facultyData.student_id.push(studentData.id);

    let faculty_update = await faculty.findByIdAndUpdate(facultyData.id,{student_id:facultyData.student_id});
    if(faculty_update){
        return res.json({status:200,"msg":"data add"});
    }else{
        return res.json({status:500,"msg":"something is wrong"});
    }
   } catch (error) {
        console.log(err);
   }
}