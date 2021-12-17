import React from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import Send from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../../store/actions/todoActions";

const AddTodo = ({ todo, setTodo }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo._id) {
      const id = todo._id;
      const updatedTodo = {
        name: todo.name,
        isComplete: todo.isComplete,
        date: todo.date,
        author: todo.author,
        uid: todo.uid,
      };
      dispatch(updateTodo(updatedTodo, id));
    } else {
      const newTodo = {
        ...todo,
        date: new Date(),
      };
      dispatch(addTodo(newTodo));
    }

    setTodo({
      name: "",
      isComplete: false,
    });
  };
  return (
    <>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        style={{ padding: "1rem" }}
      >
        <TextField
          id="enter-todo"
          variant="outlined"
          label="entertodo"
          autoFocus
          fullWidth
          value={todo.name}
          onChange={(e) => setTodo({ ...todo, name: e.target.value })}
        />
        <Button color="primary" variant="contained" type="submit">
          <Send />
        </Button>
      </form>
    </>
  );
};

export default AddTodo;
