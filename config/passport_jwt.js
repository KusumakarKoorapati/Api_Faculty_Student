const passport = require('passport');
const register = require('../model/register');
const faculty = require('../model/faculty')
const jwtSta = require('passport-jwt').Strategy;
const jwtEx = require('passport-jwt').ExtractJwt;

const opts = {
    jwtFromRequest :jwtEx.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'davinci'
}
passport.use(new jwtSta(opts, async(user, done)=>{
    let admindata = await register.findOne({email :user.data.email});
    if(admindata){
        if(admindata.password == user.data.password){
            done(null,admindata);
        }else{
            done(null,false);
        }
    }else{
        done(null,false);
    }
}))


passport.use('faculty',new jwtSta(opts, async(user, done)=>{
    let admindata = await faculty.findOne({email :user.data.email});
    if(admindata){
        if(admindata.password == user.data.password){
            done(null,admindata);
        }else{
            done(null,false);
        }
    }else{
        done(null,false);
    }
}))

passport.serializeUser((user, done)=>{
    done(null,user.id)
})
passport.deserializeUser(async (id,done)=>{
    let data = await register.findById(id);
    let factdata = await faculty.findById(id);
    if(data){
        done(null,data);
    }else{
        if(factdata){
            done(null,factdata);
        }else{
            done(null,false);
        }

    }
})

module.exports = passport;