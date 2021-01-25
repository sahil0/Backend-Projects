const Post = require('../models/post');
const User = require('../models/user');
const Use = require('../models/user');

module.exports.home = function(req, res){
    //populate the user of each post
    //populate also called preloading (preloading  multiple objects here)
    Post.find({}).populate('user')  
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
        User.find({},function(err,users){
            return res.render('home',{
                title:'Codeial | home',
                posts:posts,
                all_users:users,
             });//Now all the users available to us we just need to show them in home
        });
    });
}

// module.exports.actionName = function(req, res){}