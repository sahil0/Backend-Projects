const express=require('express');
const { Model } = require('mongoose');
const path=require('path');
const port=8000;
const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app = express();
//to set the middleware
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
//to work on static part
app.use(express.static('assets'));

var contactList=[
    // {
    //     name:"Sahil",
    //     phone:"123456789"
    // },
    // {
    //     name:"Ajay",
    //     phone:"030456789"
    // },
    // {
    //     name:"Mahesh",
    //     phone:"987654321"
    // }
]

// app.get('/practice',function(req,res){
//     return res.render('practice',{
//         title:"practice💠"
//     });
// });

app.get('/',function(req,res){
    // console.log('from get root controler',req.myName);
    Contact.find({},function(err,contacts){
        if(err){;
            console.log("Error in fetching contacts from db");
            return;
        }
        return res.render('home',{
            title:"Contacts List",
            contact_list:contacts
        });
    });
   
});

app.post('/create-contact',function(req,res){
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if (err){
            console.log('Error in Creating a contact!');
            return;
        }
        console.log("********",newContact);
        return res.redirect("back")

    });
});

app.get('/delete-contact/',function(req,res){
    //get the id from query in the ul
    let id = req.query.id;
    //find the contact in the database using id and delete
    Contact.findOneAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back')
    });
    
});



// app.get('/profile',function(req,res){
//     res.send('<h1>Cool ,it is running! or is it?</h1>');
// });
app.listen(port,function(err){
    if(err){
        console.log('Error in running the server');
    }
    // console.log(__dirname);
    console.log('Yup !My server is running on Port:',port);
});

