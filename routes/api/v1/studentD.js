const express = require('express');
const routes = express.Router();
const StudentController = require('../../../controller/api/v1/student_Controller');
routes.post('/studentRegister',StudentController.studentRegister);

module.exports = routes