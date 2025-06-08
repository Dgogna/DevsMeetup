import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router";
import { BASE_URL } from "./utils/constants";
import { useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./reducers/userSlice";

const Body = () => {
  // Whenever i will coime to this page will check if the user is logged in with the valid token
  // If not then redirect it to the login page

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      // //console.log(user);

      dispatch(addUser(user.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Navbar></Navbar>
      </header>

      {/* This outlet is because of the react router and the child routed in the body will be rendered from here */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>

      <footer className=" text-center">
        <Footer />
      </footer>
    </div>
  );
};

export default Body;
