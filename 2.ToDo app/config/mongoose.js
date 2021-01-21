//require library
const mongoose=require("mongoose");
//connect to the database
mongoose.connect('mongodb://localhost/latest_database');


// mongoose.connect("mongodb://localhost/todo_db",{ useNewUrlParser: true });
//acquire  the connection(to check if it is successful)
const db=mongoose.connection;
//error
db.on("error",console.error.bind(console,'error connecting database'));

//up and running then print the message
db.once('open',function(){
    console.log('Successfully connected to the database');
});
