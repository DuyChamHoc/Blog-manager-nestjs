import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import Screen from "./components/Screen/Screen";
import AuthRegister from "./components/Auth/AuthRegister";
import { useDispatch } from "react-redux";
import { getTodos } from "./actions/posts";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  console.log(user);
  // dispatch(getTodos());
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={!user ? <Screen /> : <Navigate replace to="/todo" />}
          />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/register" element={<AuthRegister />} />
          <Route path="/todo" element={<Home />} />
          <Route path="/todo/search" element={<Home />} />
          <Route
            path="/auth"
            element={!user ? <Auth /> : <Navigate replace to="/todo" />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
