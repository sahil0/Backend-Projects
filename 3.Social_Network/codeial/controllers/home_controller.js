const Post = require('../models/post');

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
        return res.render('home',{
            title:'Codeial | home',
            posts:posts
        });
    });
}

// module.exports.actionName = function(req, res){}