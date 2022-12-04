import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import useStyles from "./styles";
import Todo from "./Todo/Todo";
export default function Todos({ setCurrentId }) {
  const { todos } = useSelector((state) => state.todos);
  if (!todos.length) return "No Todos found";
  return (
    <Grid alightitem="stretch" spacing={3}>
      {todos.map((todo) => (
        <Grid key={todo._id} style={{ marginBottom: "20px" }}>
          <Todo todo={todo} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
}
