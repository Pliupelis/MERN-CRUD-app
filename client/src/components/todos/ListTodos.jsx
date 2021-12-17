import React, { useEffect } from "react"
import {Typography} from "@mui/material"
import Todo from './Todo'
import { useDispatch, useSelector } from "react-redux"
import { getTodos } from "../../store/actions/todoActions"

function ListTodos({ todo, setTodo}) {
    const dispatch = useDispatch()
    const todos = useSelector((state) => state.todos)

    useEffect(()=>{
    dispatch(getTodos())
    },[dispatch])

    return (
        <>
        <div>
            <Typography variant="h5">
                {todos.length > 0 ? "List" : "Empty List"}
            </Typography>
            {todos && todos.map((todo)=>{
                return (
                    <Todo
                    todo = {todo}
                    key = {todo._id}
                    setTodo = {setTodo}
                    todos={todos}
                    />
                )
            })}
        </div>
        </>
    )
}

export default ListTodos
