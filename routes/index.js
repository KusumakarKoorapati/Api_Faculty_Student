const express = require('express')

const adminController = require('../controller/Admincontroller');
const routes = express.Router();
const passport=require('passport');
const student = require('../model/student');

routes.post('/login',adminController.login);
routes.post('/register',adminController.register);
routes.get('/getAlldata',passport.authenticate('jwt'),adminController.getAlldata);
routes.delete('/DeleteData/:id',adminController.DeleteData);
routes.put('/Upadatedata/:id',adminController.Upadatedata);
routes.post('/AddAllData',student.UpImage,adminController.AddAllData)


routes.use('/faculty',require('../routes/api/v1/faculty_router'));
routes.use('/studentD',require('../routes/api/v1/studentD'));

module.exports = routes;