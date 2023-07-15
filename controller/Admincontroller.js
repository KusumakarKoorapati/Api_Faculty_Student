const register = require('../model/register');
const jwt = require('jsonwebtoken');
// const path = require('path');
const student = require('../model/student');


module.exports.register = async(req,res)=>{
    console.log(req.body);
    let checkemail = await register.findOne({email : req.body.email});
    if(checkemail){
        return res.json({'status':200, 'msg': "Email is already register"});
    }
    else{
        let Admindata =await register.create(req.body);
        if(Admindata){
            return res.json({'status':200, 'msg': "Admin Record id inserted"});
        }else{
            return res.json({'status':500, 'msg': "Something wrong"});
        }
    }
}
module.exports.getAlldata = async(req,res)=>{
    // console.log(req.body)
    let Admindata = await register.find({});
    if(Admindata){
        return res.json({'status':200, 'msg': "here is your record",'record':Admindata});
    }else{
        return res.json({'status':500, 'msg': "Something wrong",'record':Admindata});
    }
}
module.exports.login = async(req,res)=>{
    let check_email = await register.findOne({ email: req.body.email });
    if (check_email) {
        if (check_email.password == req.body.password) {
            let token = jwt.sign({ data: check_email }, 'davinci', { expiresIn: 86200 });
            console.log(token);
            return res.json({status:200,msg:"your token : ",token});
        }else{
            return res.json({status:300,msg:"incarted password "});
        }
    }else{
        return res.json({status:300,msg:"email not exsited"})
    }
}

module.exports.DeleteData = async(req,res)=>{
    // console.log(req.params.id)
    let Admindata = await register.findByIdAndDelete(req.params.id);
    if(Admindata){
        return res.json({'status':200, 'msg': "Deleted data",'record':Admindata});
    }
    else{
        return res.json({'status':500, 'msg': "Already deleted data",'record':Admindata});
    }
}
module.exports.Upadatedata =async(req,res)=>{
    // console.log(req.params.id);
    let data = await register.findById(req.params.id)
    if(data){
        let updata = await register.findByIdAndUpdate(data.id,req.body);
        if(updata){
            return res.json({'status':200, 'msg': "Update data"});
        }else{
            return res.json({'status':400, 'msg': "Already Update data"});
        }
    }else{
        return res.json({'status':500, 'msg': "id not find",'record':data});
    }
}
module.exports.AddAllData = async(req,res)=>{
    // console.log(req.body);
    // console.log(req.files);
   try {
    let singleImage = '';
    if(req.files.Image){
        singleImage = student.singlepath+'/'+req.files.Image[0].filename;
    }
    req.body.Image = singleImage;

    let multiimage = [];
    if(req.files.multiImage){
        for(var i=0; i<req.files.multiImage.length; i++){
            multiimage[i] = req.files.multiImage[i].filename;
        }
    }
    req.body.multiImage = multiimage;

    let checkemail = await student.findOne({email:req.body.email});
    if(checkemail){
        return res.json({'status':500,'msg':'data is already add'})
    }else{
        let data = await student.create(req.body);
        if(data){
            return res.json({'status':200,'msg':"data Added Successfully"});
        }else{
            return res.json({'status':500,'msg':'data is not available'})
        }
    }
   } catch (error) {
        console.log("AddAllData is error",error);
   }
}