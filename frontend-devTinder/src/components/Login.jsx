import React, { useState } from "react";
import axios from "axios";
import { addUser, removeUser } from "../reducers/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isLoginForm, setIsLoginForm] = useState(true);

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
      setError("Invalid credentials");
    }
  };

  const handleLogin = () => {
    getUserLogin(email, password);
  };

  const handleSignUp = async () => {
    const response = await axios.post(
      BASE_URL + "/signup",
      { firstName, lastName, emailId: email, password },
      { withCredentials: true }
    );

    dispatch(addUser(response.data.data));
    navigate("/profile");
  };

  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body flex">
          <div className="p-4">
            <h2 className="card-title justify-center">
              {isLoginForm ? "Login" : "SignUp"}
            </h2>
          </div>
          {!isLoginForm && (
            <div className="p-2">
              <p>First Name</p>
              <input
                type="text"
                placeholder="First Name"
                className="input"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
          )}
          {!isLoginForm && (
            <div className="p-2">
              <p>Last Name</p>
              <input
                type="text"
                placeholder="Last Name"
                className="input"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
          )}
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
              type="password"
              placeholder="Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="px-2 text-red-400">{error}</p>
          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <div
            className="m-auto cursor-pointer pt-4"
            onClick={() => {
              setIsLoginForm((value) => !value);
            }}
          >
            <p>
              {isLoginForm ? "Not SignedIn? Sign up" : "Alrady SignedUp? Login"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
