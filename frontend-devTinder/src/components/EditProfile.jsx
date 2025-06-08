import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../reducers/userSlice";

const EditProfile = () => {
  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const toastTimeout = useRef(null);

  const [profile, setProfile] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    photoUrl: user.photoUrl,
    age: user.age,
    gender: user.gender,
    about: user.about,
  });

  const [error, setError] = useState("");

  const [toast, setToast] = useState({
    showToast: false,
    message: "",
    type: "",
  });

  const handleChange = (e) => {
    const newObj = { ...profile, [e.target.name]: e.target.value };

    setProfile(newObj);
  };

  const editProfile = async () => {
    if (toastTimeout.current) {
      clearTimeout(toastTimeout.current);
      console.log("came in this if condirtion");
    }

    try {
      const updatedUser = await axios.patch(
        BASE_URL + "/profile/edit",
        profile,
        {
          withCredentials: true,
        }
      );

      if (!updatedUser) {
        throw new Error("Please chedk the given cedentials");
      }

      dispatch(addUser(updatedUser.data));
      setToast({
        showToast: true,
        message: "Profile is updated successfully",
        type: "success",
      });
      toastTimeout.current = setTimeout(() => {
        setToast({ showToast: false, message: "", type: "" });
      }, 3000);
      setError("");
    } catch (error) {
      setToast({
        showToast: true,
        message: "Error in updating profile",
        type: "error",
      });
      toastTimeout.current = setTimeout(() => {
        setToast({ showToast: false, message: "", type: "" });
      }, 3000);
      setError(error?.response?.data);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body flex">
          <div className="p-4">
            <h2 className="card-title justify-center">Edit Profile</h2>
          </div>
          <div className="p-2">
            <p>FirstName</p>
            <input
              type="text"
              placeholder="FirstName"
              className="input"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="p-2">
            <p>LastName</p>
            <input
              type="text"
              placeholder="LastName"
              className="input"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="p-2">
            <p>Photo Url</p>
            <input
              type="text"
              placeholder="Photo Url"
              className="input"
              name="photoUrl"
              value={profile.photoUrl}
              onChange={handleChange}
            />
          </div>
          <div className="p-2">
            <p>Age</p>
            <input
              type="text"
              placeholder="Age"
              className="input"
              name="age"
              value={profile.age}
              onChange={handleChange}
            />
          </div>
          <div className="p-2">
            <p>Gender</p>
            <input
              type="text"
              placeholder="Gender"
              className="input"
              name="gender"
              value={profile.gender}
              onChange={handleChange}
            />
          </div>

          <div className="p-2">
            <p>About</p>
            <input
              type="text"
              placeholder="About"
              className="input"
              name="about"
              value={profile.about}
              onChange={handleChange}
            />
          </div>
          <p className="px-2 text-red-400">{error}</p>

          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary" onClick={() => editProfile()}>
              Edit Profile
            </button>
          </div>

          {toast.showToast && (
            <>
              <div className="toast toast-end">
                <div className={`alert alert-${toast.type}`}>
                  <span>{toast.message}!</span>
                </div>
              </div>
              {/* <div className="toast toast-end">
                <div className="alert alert-errro">
                  <span>{toast.message}</span>
                </div>
              </div> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
