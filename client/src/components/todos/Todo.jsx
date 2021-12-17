import React from "react"
import {Typography, Button} from "@mui/material"
import { Create, Delete, CheckCircle} from "@mui/icons-material"
import moment from "moment"
import { useDispatch } from "react-redux"
import { checkTodo, deleteTodo } from "../../store/actions/todoActions"

const Todo = ({ todo, setTodo }) =>{

    const dispatch = useDispatch()

    const handleUpdateClick = () =>{
        setTodo(todo)

        window.scrollTo({
            top:0,
            left:0,
            behavior:"smooth"
        })
    }
    
const handleCheck = (id) =>{
    dispatch(checkTodo(id))
}

const handleDelete = (id) =>{
    dispatch(deleteTodo(id))
}

    return (
    <>
        <div>
            <div>
            <Typography variant="subtitle1">
                {todo.name}
            </Typography>
            <Typography variant="body2">
                author: ME
            </Typography>
            <Typography variant="body2">
                Created: { moment(todo.date).fromNow() }
            </Typography>
            </div>
            <div>
                <Button onClick={()=>handleCheck(todo._id)} size="small" aria-label="outlined primary button group">
                    <CheckCircle color="action"/>
                </Button>
                <Button onClick={()=>handleUpdateClick()} size="small" aria-label="outlined primary button group">
                    <Create color="primary"/>
                </Button>
                <Button onClick={()=> handleDelete(todo._id)}size="small" aria-label="outlined primary button group">
                    <Delete color="secondary"/>
                </Button>
            </div>
        </div>
    </>
    )
}

export default Todo
