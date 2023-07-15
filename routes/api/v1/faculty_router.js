const express = require('express');
const routes = express.Router();
const FacultyController = require('../../../controller/api/v1/faculty_Controller');
const passport = require('passport');

routes.post('/facutyRegister',FacultyController.Register);
routes.post('/facutyLogin',FacultyController.Login);
routes.get('/GetAllFacultyData',passport.authenticate('faculty'),FacultyController.GetAllFacultyData);
routes.get('/myprofile', async (req,res)=>{
    // return res.json({user:req.user});
    return res.json({status:200,"msg":req.user});
})

module.exports = routes;