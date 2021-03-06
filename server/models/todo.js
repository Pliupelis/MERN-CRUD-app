import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
    name:{ type: String, required: true, minlength: 3 },
    author: String,
    uid: String,
    isComplete: Boolean,
    date:{ type: Date, default: new Date() }
})

const Todo = mongoose.model('Todo', todoSchema)

export default Todo