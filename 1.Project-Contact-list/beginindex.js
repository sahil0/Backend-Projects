const express=require('express');
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
//middleware1
// app.use(function(req,res,next){
//     req.myName="Sahil";
//     //console.log('middleware 1 called');
//     next();
// });
// //middleware2
// app.use(function(req,res,next){
//     console.log("My Name from MW2",req.myName);
//     //console.log('middleware 2 called');
//     next();
// });
var contactList=[
    {
        name:"Sahil",
        phone:"123456789"
    },
    {
        name:"Ajay",
        phone:"030456789"
    },
    {
        name:"Mahesh",
        phone:"987654321"
    }
]

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"practice💠"
    });
});

app.get('/',function(req,res){
    // console.log('from get root controler',req.myName);
    return res.render('home',{
        title:"FcuK💠",
        contact_List:contactList
    });

})

app.post('/create-contact',function(req,res){
    
    // return res.redirect('/practice');
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
    // contactList.push(req.body)
    // return res.redirect('/');
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

app.get('/delete-contact/',function(req,res){
    // console.log(req.params);
    // let phone=req.params.phone;
    // console.log(req.query);
    //get the query from the url
    let phone=req.query.phone;
    let contactIndex=contactList.findIndex(contact => contact.phone == phone);
    if (contactIndex!=-1){
        contactList.splice(contactIndex,1);
    }
    return res.redirect('back')

});
