const passport=require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User=require('../models/user');


//creating authentication function we need to tell passport to use the local strategy we have created
 passport.use(new LocalStrategy({
     usernameField:'email'
    },
    //here done is function which returning back to passport.js 
    function(email,password,done){
        //find a user and establish the identity
        //but user is not imported right now 
        //here first email is related to schema and second is the value that pass by user
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('Error in finding user --->Passport');
                return done(err);
            }
            if(!user || user.password != password){
                console.log('Invalid UserName/Password');
                return done(null,false);
            }
            return done(null,user);
        });
    }     
));
//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});
//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user --->Passport');
            return done(err);
        }
        return done(null,user) //no error so find/return  user
    });
});



//check if the user is authenticated /say its a middleware to check if user sign in or not
passport.checkAuthentication=function(req,res,next){
    //if the user is signed in then pass on the request to the next function (controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in 
    return res.redirect('/users/sign-in');
};

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in users from the session cookie and we are just sending this to the locals for viewa
        res.locals.user=req.user;  
    }
    next()
}
//next we go to routes to use all of this we creates above two functions


module.exports=passport;
