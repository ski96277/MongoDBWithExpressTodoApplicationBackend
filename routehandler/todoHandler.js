const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model("Todo",todoSchema);


//Get all the todos

router.get('/retriveAllTodods', (req,res)=>{

     Todo.find({status:"active"},(err,data)=>{
        if(err){

            res.status(500).json({message:err.message});

        }else{

            res.status(200).json({
                message:"Todos list ",
                result: data,
            });

        }
    }).clone();
});

//Get a todo
router.get('/:id',async (req,res)=>{

    try{
        const data = await Todo.find({_id:req.params.id}).exec();

        res.status(200).json({
            message: "get one todo item",
            result: data
        });
    }catch(err){
        res.status(500).json({message: err.message});
 
    }

});

//create a todo
router.post('/create/', (req,res)=>{
    console.log(req.body);

    const newTodo = new Todo(req.body);
    
     newTodo.save((err)=>{
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);

        }else{
            res.status(200).send("Todo was inserted succesfully");
        }
    });

});

//create multiple todo
router.post('/createMultipleTodo', (req,res)=>{

    console.log(req.body);
  Todo.insertMany(req.body,(err)=>{    
    if(err){
        console.log(err.message);
        res.status(500).send(err.message);
    }else{
        res.status(200).send("Todos ware inserted");
    }
});
});

//update todo
router.put('/updateTodo/:id',(req,res)=>{
    console.log("updated id  = "+req.params.id);
    Todo.updateOne({_id:req.params.id},{
        $set:{status:'inActive'}
    },(err)=>{
        if(err){
            res.status(500).send(err.message);
        }else{
            res.status(200).send("status updated");
        }
    });

});

router.delete('/deleteTodo/:id', (req,res)=>{
     Todo.deleteOne({_id:req.params.id},(err)=>{
       if(err){
           res.send(500).json({

            message: err.message
           });

       }else{
           res.status(200).json({
               "message": "Delted successfuly"
           });
       }
   }).clone();

});

module.exports = router;