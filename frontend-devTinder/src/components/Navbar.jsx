import React from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);

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
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
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
