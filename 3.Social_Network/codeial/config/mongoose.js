const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/codeial_development');

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to mongo database"));


db.once('open',function(){
    console.log('Connected to Database::MongoDB⛑i9 ');
});

module.exports=db;