import axios from "axios";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../reducers/userSlice";
import { removeFeed } from "../reducers/feedSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );

      //   will then clear the store
      dispatch(removeUser());
      dispatch(removeFeed());
      navigate("/login");
    } catch (error) {}
  };

  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl">
            &#x1F468;&#x200D;&#x1F4BB; DevTinder
          </Link>
        </div>
        {user && (
          <div className="flex gap-2 items-center">
            <h3 className="">Hello, {user.firstName}</h3>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={
                      user?.photoUrl ??
                      "https://thumb.ac-illust.com/78/789b5b03aa0507611dd2a309904b6bad_t.jpeg"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to={"/profile"} className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/connections"} className="justify-between">
                    Connections
                  </Link>
                </li>
                <li>
                  <Link to={"/requests"} className="justify-between">
                    Requests
                  </Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
