const faculty = require('../../../model/faculty');
const jwt = require('jsonwebtoken');


module.exports.Register = async(req,res)=>{
    // console.log(req.body);
    try {
        if(req.body.password === req.body.confirmpassword){
            let checkemail = await faculty.findOne({email : req.body.email});
            if(checkemail){
                return res.json({status:500, 'msg': "Data is already added"})
            }else{
                let data = await faculty.create(req.body);
                if(data){
                    return res.json({status:200, 'msg':"data added successfuly"})
                }else{
                    return res.json({status:500, 'msg': "Data is not added"})
                }
            }
        }else{
            return res.json({status:500, 'msg': "password and confirm password are not matched"})
        }
    } catch (error) {
        console.log("faculty register error",error);
    }
}


module.exports.Login = async(req,res)=>{
    let checkemail = await faculty.findOne({email: req.body.email});
    if(checkemail){
        if(checkemail.password == req.body.password){
            let token = jwt.sign({data:checkemail},'davinci',{expiresIn:84600});
            return res.json({status:200,'msg':token})
        }else{
            return res.json({"status":500,"msg":"invalid enterd data"});
        }
    }else{
        return res.json({"status":500,"msg":"data not available"});
    }
}


module.exports.GetAllFacultyData = async(req,res)=>{
    // return res.redirect('/faculty/myprofile');

    let data = await faculty.findById(req.user.id).populate('student_id').exec();
    if(data){
        return res.json({status:200,"msg":data});
    }else{
        return res.json({status:500,"msg":'something wrong'});
    }
}