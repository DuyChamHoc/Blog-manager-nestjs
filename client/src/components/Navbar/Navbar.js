import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./styles";

export default function Navbar() {
  let navigate = useNavigate();
  const disspatch = useDispatch();
  const classes = useStyles();
  let user = JSON.parse(localStorage.getItem("profile"));
  const logout = () => {
    disspatch({ type: "LOGOUT" });
    navigate("/auth");
    user = null;
  };
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          {" "}
          To Do List
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.username ? (
          <div className={classes.profile}>
            <Typography className={classes.userName} variant="h6">
              {user.username}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
