import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../reducers/connectionsSlice";
import ConnectionCard from "./connectionCard";

const Connections = () => {
  const dispatch = useDispatch();

  const getConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });

    dispatch(addConnections(res.data.data));
  };

  useEffect(() => {
    getConnections();
  }, []);

  const connections = useSelector((store) => store.connections);
  if (!connections) {
    return null;
  } else if (connections.length == 0) {
    return <h1 className="text-center">No connections found</h1>;
  }

  return (
    <div className="  m-auto">
      <h1 className="py-4 text-3xl m-auto text-center">Connections</h1>
      {connections.map((connection) => {
        return (
          <div
            key={connection._id}
            className="flex justify-center m-auto  w-1/2"
          >
            <ConnectionCard config={connection} />
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
