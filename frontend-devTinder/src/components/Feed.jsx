import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../reducers/feedSlice";
import UserCard from "./userCard";

const Feed = () => {
  const feed = useSelector((store) => {
    return store.feed;
  });
  const getUserFeed = async () => {
    if (feed.length === 0) {
      const userFeed = await axios.get(
        BASE_URL + "/user/feed",

        { withCredentials: true }
      );
      dispatch(addFeed(userFeed.data));
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    getUserFeed();
  }, []);

  return (
    <>
      {feed.length > 0 &&
        feed.map((value, index) => {
          return (
            <div key={value._id}>
              {index === 0 ? <UserCard userDetails={value}></UserCard> : null}
            </div>
          );
        })}
    </>
  );
};

export default Feed;
