const express = require('express');
const port = 8002;
const app = express();
// const db = require('./config/mongoose');


const mongoose = require('mongoose')

const url = `mongodb+srv://kusumakarkoorapati:Kusu503@cluster0.7pyntq7.mongodb.net/Apinode`;

mongoose.connect(url,{
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
  .then( () => {
    console.log('Connected to database')
  })
  .catch( (err) => {
    console.error(`Error connecting to the database.`);
  })
const Admin = require('./model/register');
app.use(express.urlencoded());


//session
const passport = require('passport');
const passport_mid = require('./config/passport_jwt');
const session = require('express-session');
app.use(session({
    name :'Admin',
    secret:'Admin_log',
    saveUninitialized :false,
    cookie :{
        maxAge:100*60*100
    }
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/',require('./routes/index'))
app.listen(port,(err)=>{
    if(err){
        console.log("Server is not runnig")
        return false;
    }
    console.log("Server is runnig on :",port)
})