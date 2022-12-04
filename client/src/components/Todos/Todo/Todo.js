import React from "react";
import { Card, CardActions, Button, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CachedIcon from "@material-ui/icons/Cached";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../../../actions/posts";
import { updateStatus } from "../../../actions/posts";

export default function Todo({ todo, setCurrentId }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const updateStatusMain = (id, status) => {
    if (status == "Pending") {
      dispatch(updateStatus(id, { status: "Inprogress" }));
    } else {
      if (status == "Inprogress") {
        dispatch(updateStatus(id, { status: "Completed" }));
      } else {
        alert("You done it");
      }
    }
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <div style={{ marginTop: "10px" }}>
        <Typography className={classes.title} variant="h5">
          Title: {todo.title}
        </Typography>
        <Typography className={classes.title} variant="h5">
          Description: {todo.description}
        </Typography>
        <div style={{ display: "flex" }}>
          <Typography style={{ marginLeft: "15px" }} variant="h5" gutterBottom>
            Status: {todo.status}
          </Typography>
          <Typography style={{ marginLeft: "100px" }} variant="h6">
            {todo.time}
          </Typography>
        </div>
      </div>

      <CardActions className={classes.cardActions}>
        <div>
          <Button
            style={{ marginLeft: "10px" }}
            size="large"
            color="secondary"
            onClick={() => dispatch(deleteTodo(todo._id))}
          >
            <DeleteIcon fontSize="large" />
            Delete
          </Button>
          <Button
            style={{ color: "black" }}
            size="large"
            onClick={() => {
              setCurrentId(todo._id);
            }}
          >
            <MoreHorizIcon fontSize="large" />
          </Button>
          <>
            {todo.status == "Pending" ? (
              <Button
                style={{ color: "black" }}
                size="large"
                onClick={() => {
                  updateStatusMain(todo._id, todo.status);
                }}
              >
                <EventBusyIcon fontSize="large" />
              </Button>
            ) : (
              <>
                {todo.status == "Inprogress" ? (
                  <Button
                    style={{ color: "black" }}
                    size="large"
                    onClick={() => {
                      updateStatusMain(todo._id, todo.status);
                    }}
                  >
                    <CachedIcon fontSize="large" />
                  </Button>
                ) : (
                  <Button
                    style={{ color: "black" }}
                    size="large"
                    onClick={() => {
                      updateStatusMain(todo._id, todo.status);
                    }}
                  >
                    <EventAvailableIcon fontSize="large" />
                  </Button>
                )}
              </>
            )}
          </>
        </div>
      </CardActions>
    </Card>
  );
}
