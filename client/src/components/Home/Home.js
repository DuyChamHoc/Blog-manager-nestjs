import React, { useEffect, useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import useStyles from "./styles";
import Form from "../Form/Form";
import Todos from "../Todos/Todos";
import moment from "moment";
import { getTodos, getTodosBySearch } from "../../actions/posts";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home() {
  const [value, onChange] = useState("");
  const [date, setdate] = useState("");
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch(); 
  const query = useQuery();
  const navigate = useNavigate();
  if (!date) {
    dispatch(getTodos());
  }

  const searchPost = () => {
    if (date.trim()) {
      dispatch(getTodosBySearch(date));
      navigate(`/todo/search?searchDate=${date}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Todos setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <DateTimePicker
                onCalendarClose={() =>
                  setdate(moment(value).format("DD/MM/YYYY"))
                }
                onChange={onChange}
                value={value}
                format="dd-MM-y"
              />
              <Button
                onClick={searchPost}
                style={{ marginTop: "10px" }}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}
