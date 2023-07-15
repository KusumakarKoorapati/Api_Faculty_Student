const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Apinode');

const db = mongoose.connection;

db.once('open',(err)=>{
    if(err){
        console.log("db is not connected");
        return false;
    }
    console.log("DB is connected");
});

module.exports = db;