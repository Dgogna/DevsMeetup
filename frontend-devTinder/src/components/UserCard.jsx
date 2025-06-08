import React from "react";

const UserCard = ({ userDetails, isEditable = true }) => {
  const { firstName, lastName, about, photoUrl, age, gender } = userDetails;

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
                <button className="btn btn-primary">Ignore</button>
                <button className="btn btn-secondary">Interested</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
