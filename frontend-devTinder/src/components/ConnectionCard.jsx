import React from "react";

const ConnectionCard = ({ config }) => {
  const { firstName, lastName, photoUrl, about } = config;

  return (
    <div className="flex w-full my-2 bg-base-300 items-center">
      <div className="h-20 w-20 m-4">
        <img
          alt="connection photo"
          src={photoUrl}
          className="rounded-full h-20 w-20"
        />
      </div>
      <div className="p-2">
        <div>
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{about}</p>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
