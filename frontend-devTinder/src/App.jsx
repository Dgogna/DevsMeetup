import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Body from "./Body";
import Feed from "./components/Feed";
import Profile from "./components/Profile";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="" element={<Feed />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="signup" element={<SignUp />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
