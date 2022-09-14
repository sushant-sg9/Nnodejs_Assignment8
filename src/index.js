const express = require('express')
const userArr=require('./InitialData')
const app = express()
const bodyParser = require("body-parser");
const e = require('express');
const port = 8080
app.use(express.urlencoded());

let new_id=userArr.length+1

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

app.get('/api/student',(req,res)=>{
    try{
        res.json({
            status:'success',
            userArr
        })
    }
    catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
    
})

app.get('/api/student/:id',(req,res)=>{
    try{
        let idx=userArr.findIndex(obj=>obj.id==req.params.id)
        if(idx==-1){
           return res.status(400).json({
                status:"failed",
                message:"There is no Student with this ID"
            })
        }
        res.json({
            status:'success',
            data:userArr[idx]
        })
    }
    catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
    
})

app.post('/api/student',(req,res)=>{
    try{
        if(!req.body.name|| !req.body.currentClass || !req.body.division){
            return res.status(400).json({
                status:"failed",
                message:"Data Missing"
            })
        }
        let data=userArr.push({
            id:new_id,
            name:req.body.name,
            currentClass:req.body.currentClass,
            division:req.body.division
        })
      
        res.json({
            status:"success",
            id:new_id
        })
        new_id++
    }
    catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
})

app.put('/api/student/:id',(req,res)=>{
    try{
        let idx=userArr.findIndex(obj=>obj.id==req.params.id)
        if(idx==-1){
            return res.status(400).json({
                status:"failed",
                message:"There is no Student with this ID"
            })
        }
        let newName=req.body.name
        let newCurrentClas=req.body.currentClass
        let newDivision=req.body.division
        if(newName){
            userArr[idx].name=newName
        }
        if(newCurrentClas){
            userArr[idx].currentClass=newCurrentClas
        }
        if(newDivision){
            userArr[idx].division=newDivision
        }

        res.status(201).json({
            status:"success",
            data:userArr[idx]
        })
    }
    catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
})

app.delete('/api/student/:id',(req,res)=>{
    try{
    let idx=userArr.findIndex(obj=>obj.id==req.params.id)
    if(idx==-1){
        res.status(400).json({
            status:"failed",
            message:"There is no Student with this ID"
        })
    }

    userArr.splice(idx,1);
    res.status(201).json({
        status:"Success",
        message:"data deleted successfully"
    })
}
    catch(e){
        res.status(404).json({
            status:"failed",
            message:e.message
        })
    }
})
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   