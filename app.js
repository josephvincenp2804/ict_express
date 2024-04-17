// Task1: initiate app and run server at 3000
const express = require('express')
const app=express(); 
const postMod = require('./model/postmodel');

app.use(express.json());



const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://josephvincenp2804:12345@cluster0.3ifveg6.mongodb.net/emp?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("connected to DB")
})
.catch((err)=>{
    console.log(err)
})


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

app.use(express.json());



//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist',async(req,res)=>{
    try{
        const data =await postMod.find()
        res.send(data);
    }catch(error){
        console.log(error)
    }
})




//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id',async(req,res)=>{
    try{
        const id =req.params.id;
       const data = await postMod.findById(id);
        res.send(data);
    }catch(error){
        console.log(error)
    }
})



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
//api
app.post('/api/employeelist',async(req,res)=>{
    try{
        const data =req.body;
        await postMod(data).save();
        res.send({message:"Data added"})
    }catch(error){
        console.log(error)
    }
})




//TODO: delete a employee data from db by using api '/api/employeelist/:id'


app.delete('/api/employeelist/:id',async(req,res)=>{
    try{
        const id =req.params.id;
        await postMod.findByIdAndDelete(id);
        res.send({message:"Data deleted"});
    }catch(error){
        console.log(error)
    }
})




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist',async(req,res)=>{
    const id =req.body._id
    try{
       const final =  await postMod.findByIdAndUpdate(id,req.body)
       final.save();
    res.send({message:"Data updated"});
    }catch(error){
        console.log(error)
    }
});


//! dont delete this code. it connects the front end file.
app.listen(3000,()=>{
    console.log('running in 3000');
})
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



