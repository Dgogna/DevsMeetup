import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../reducers/requestsSlice";
import ConnectionCard from "./connectionCard";
import Requestcard from "./requestCard";

const Requests = () => {
  const dispatch = useDispatch();

  const getRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/requests/recieved", {
      withCredentials: true,
    });

    dispatch(addRequests(res.data.data));
  };

  useEffect(() => {
    getRequests();
  }, []);

  const requests = useSelector((store) => store.requests);
  if (!requests) {
    return null;
  } else if (requests.length == 0) {
    return <h1 className="text-center">No requests found</h1>;
  }

  return (
    <div className="  m-auto">
      <h1 className="py-4 text-3xl m-auto text-center">Requests</h1>
      {requests.map((request) => {
        return (
          <div key={request._id} className="flex justify-center m-auto  w-3/4">
            <Requestcard config={request.fromUserId} requestId={request._id} />
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
