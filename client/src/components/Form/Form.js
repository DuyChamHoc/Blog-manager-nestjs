import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { useNavigate } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import { createTodo, getTodos, updateTodo } from "../../actions/posts";

export default function Form({ currentId, setCurrentId }) {
  const [value, onChange] = useState("");
  const todo = useSelector((state) =>
    currentId ? state.todos.todos.find((p) => p._id === currentId) : null
  );
  const [todoData, setTodoData] = useState({
    title: "",
    description: "",
    time: "",
    status: "Pending",
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();

  useEffect(() => {
    if (todo) setTodoData(todo);
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoData.description || !todoData.title || !todoData.time) {
      alert("Please enter");
    } else {
      if (currentId) {
        dispatch(updateTodo(currentId, { ...todoData }));
      } else {
        dispatch(createTodo({ ...todoData }));
      }
    }

    clear();
    todoData.status = "Pending";
  };
  const clear = () => {
    setCurrentId(null);
    setTodoData({ title: "", description: "" });
    onChange("");
  };

  if (!user?.username) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like others memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Todolist
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={todoData.title}
          onChange={(e) => setTodoData({ ...todoData, title: e.target.value })}
        />
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          value={todoData.description}
          onChange={(e) =>
            setTodoData({ ...todoData, description: e.target.value })
          }
        />
        <div style={{ marginRight: "90px" }}>
          <DateTimePicker
            onCalendarClose={(e) =>
              setTodoData({
                ...todoData,
                time: moment(value).format("DD/MM/YYYY"),
              })
            }
            onChange={onChange}
            value={value}
            format="dd-MM-y"
          />
        </div>

        <Button
          style={{ marginTop: "20px" }}
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}
