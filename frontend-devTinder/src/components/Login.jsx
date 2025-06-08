import React, { useState } from "react";
import axios from "axios";
import { addUser } from "../reducers/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("dhruv@gmail.com");
  const [password, setPassword] = useState("Dhruv@12");

  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserLogin = async (email, password) => {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password: password,
        },
        { withCredentials: true }
      );
      if (response.data === "Invalid credentials") {
        throw new Error("Credentials are not valid");
      }
      dispatch(addUser(response.data));
      navigate("/");
    } catch (error) {
      //    // //console.log("There is some problem in loggin in the user " + error);
      setError("Invalid credentials");
    }
  };

  const handleLogin = () => {
    getUserLogin(email, password);
  };

  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body flex">
          <div className="p-4">
            <h2 className="card-title justify-center">Login</h2>
          </div>
          <div className="p-2">
            <p>Email</p>
            <input
              type="text"
              placeholder="Email"
              className="input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="p-2">
            <p>Password</p>
            <input
              type="text"
              placeholder="Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="px-2 text-red-400">{error}</p>
          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
