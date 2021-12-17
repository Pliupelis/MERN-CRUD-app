import express from 'express'
import joi from 'joi'
import Todo  from '../models/todo.js'

const router = express.Router();

export const getTodo = async (req, res)=>{
    try{
    const todos = await Todo.find().sort({date: -1})
    const filteredTodos = todos.filter(todo => todo.uid === req.user._id)
        res.send(filteredTodos)
    }catch(error){
        res.status(500).send(error.message)
    }
}

export const createTodo = async (req, res)=>{
    const schema = joi.object({
        name: joi.string().min(3).max(100).required(),
        author: joi.string().min(3).max(30),
        isComplete: joi.boolean(),
        date: joi.date(),
        uid: joi.string()
    })

    const {error} = schema.validate(req.body);
    if(error) 
    return res.status(400).send(error.details[0].message)

    const {name, author, uid, isComplete, date} = req.body;

    let todo = new Todo({name, author, uid, isComplete, date});

    todo = await todo.save();
    res.send(todo);
}

export const updateTodo = async (req, res)=>{
    const schema = joi.object({
        name: joi.string().min(3).max(100).required(),
        author: joi.string().min(3).max(30),
        isComplete: joi.boolean(),
        date: joi.date(),
        uid: joi.string()
    }
    );

    const {error} = schema.validate(req.body);

    if(error) 
    return res.status(400).send(error.details[0].message)
    try{
    const todo = await Todo.findById(req.params.id);

    if(!todo) 
    return res.status(404).send("not found");

    if(todo.uid !== req.user._id) 
    return res.status(401).send("update failed/not authorized")

    const {name, author, uid, isComplete, date} = req.body;

    const updateTodo = await Todo.findByIdAndUpdate(req.params.id, {name, author, uid, isComplete, date},
        {new: true});
    res.send(updateTodo)
    }catch(error){
        res.status(500).send(error.message);
        console.log(error.message);
    }
}

export const deleteTodo = async (req, res)=>{
    try {
    const todo = await Todo.findById(req.params.id);

    if(!todo) 
    return res.status(404).send("not found");

    if(todo.uid !== req.user._id) 
    return res.status(401).send("deletion failed/not authorized")

    const deletedtodo = await Todo.findByIdAndDelete(req.params.id);
       
    res.send(deletedtodo);
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error.message);
    }
}

export const updatepartTodo = async (req, res)=>{
    try {
    const todo = await Todo.findById(req.params.id);
    if(!todo) 
    return res.status(404).send("not found");

    if(todo.uid !== req.user._id) 
    return res.status(401).send("update failed/not authorized")

    const updatepart = await Todo.findByIdAndUpdate(req.params.id, {
        isComplete: !todo.isComplete
    },
    {new: true})
    res.send(updatepart)
} catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
}
}
export default router