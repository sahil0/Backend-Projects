const express = require("express");

const path=require("path");

const app = express();

const port=8000;
const db = require("./config/mongoose");
const Todotask = require("./models/schema");

app.set("view engine","ejs");

app.set("views","./views");

app.use("/", require("./routes"));

app.use(express.urlencoded());
app.use(express.static("assets"));

app.post("/create-task",function(req,res){
    Todotask.create(
        {
        task:req.body.description,
        category:req.body.category,
        date:req.body.date,
    },
    function(err,task) {
            if(err){
                console.log("Error in creating a task.....");
                return;
            }
            console.log("********",task);
            return res.redirect("back")
        }
    )
});
app.get('/delete-todo/',function(req,res){
    //get the id from query in the ul
    let id = req.query.id;   
    //find the contact in the database using id and delete
    Todotask.findOneAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back')
    });
    
});
// app.post("/delete-todo/",(req, res) => {
//     console.log(req.body);
  
//     let tasks = Object.keys(req.body);
  
//     for (task of tasks) {
//       // mongoose to delete the tasks
//       Todotask.deleteOne({ _id: task }, function (err) {
//         if (err) {
//           console.log("Error in deleting from database.", err);
//           return;
//         }
//       });
//     }
//     return res.redirect("back");
//   });

app.listen(port, function (err) {
    if (err) return console.log(`Error: ${err}`);
  
    console.log(`Server is running on port: ${port}`);
  });
  