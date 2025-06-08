import React from "react";
import EditProfile from "./EditProfile";
import UserCard from "./userCard";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <div className="flex justify-center mt-12 ">
      {user && (
        <>
          <div className="px-4">
            <EditProfile />
          </div>
          <div className="px-4">
            <UserCard userDetails={user} isEditable={false}></UserCard>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
