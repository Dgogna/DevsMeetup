import React from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addRequests } from "../reducers/requestsSlice";
import { useDispatch } from "react-redux";

const Requestcard = ({ config, requestId }) => {
  const { firstName, lastName, photoUrl, about } = config;

  const dispatch = useDispatch();

  const handleRequest = async (status, id) => {
    const URL = BASE_URL + "/request/review/" + status + "/" + id;

    await axios.post(URL, { status, requestId: id }, { withCredentials: true });

    // After doing this i should update my store and basically remove this id from the requests
    const res = await axios.get(BASE_URL + "/user/requests/recieved", {
      withCredentials: true,
    });

    dispatch(addRequests(res.data.data));
  };

  return (
    <div className="flex w-full my-2 bg-base-300 items-center">
      <div className="h-20 w-20 m-4">
        <img
          alt="connection photo"
          src={photoUrl}
          className="rounded-full h-20 w-20"
        />
      </div>
      <div className="p-2 w-100">
        <div>
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{about}</p>
        </div>
      </div>
      <div className="p-2">
        <button
          className="btn btn-primary mx-2"
          onClick={() => {
            handleRequest("rejected", requestId);
          }}
        >
          Reject
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            handleRequest("accepted", requestId);
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default Requestcard;
