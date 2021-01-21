const mongoose = require('mongoose');

//creating schema
const todoSchema = new mongoose.Schema({
    task:{
        type:String,
        require:true,
    },
    category:{
        type:String,
        require:true,
    },
    date:{
        type:Date,
        require:true,
    },
});
const Task = mongoose.model("Task",todoSchema);
module.exports = Task;
