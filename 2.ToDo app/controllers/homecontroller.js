const Task = require("../models/schema");

//home controllers
module.exports.home = function (req,res){
    Task.find({},function (err,task) {
        if(err){
            console.log("Error fetching data", err);
            return;
        }
        return res.render("home",{
            title:"Todo App",
            todo_list:task,
        })
    })
    
}