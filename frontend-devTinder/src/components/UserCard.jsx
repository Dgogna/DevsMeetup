import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../reducers/feedSlice";

const UserCard = ({ userDetails, isEditable = true }) => {
  const { firstName, lastName, about, photoUrl, age, gender, _id } =
    userDetails;

  const dispatch = useDispatch();

  const handlerequest = async (status, userId) => {
    const requestUrl = BASE_URL + "/request/send/" + status + "/" + userId;

    try {
      const data = await axios.post(requestUrl, {}, { withCredentials: true });

      dispatch(removeUserFromFeed(userId));
    } catch (error) {}
  };

  return (
    <div className="flex justify-center ">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="user" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <h3>
            {age}, {gender}
          </h3>
          <p>{about}</p>
          {isEditable && (
            <>
              <div className="card-actions justify-center my-4">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handlerequest("ignored", _id);
                  }}
                >
                  Ignore
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => handlerequest("interested", _id)}
                >
                  Interested
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
