import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import feedReducer from "./reducers/feedSlice";
import connectionReducer from "./reducers/connectionsSlice";
import requestReducer from "./reducers/requestsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    requests: requestReducer,
  },
});
