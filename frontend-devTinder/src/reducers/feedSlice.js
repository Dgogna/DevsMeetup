import { createSlice } from "@reduxjs/toolkit";

export const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => {
      const feed = action.payload;
      if (feed) {
        state = action.payload;
        return state;
      }
    },
    removeUserFromFeed: (state, action) => {
      console.log(action.payload);
      const newFeed = state.filter((user) => {
        return user._id !== action.payload;
      });

      console.log(newFeed);

      state = newFeed;
      return state;
    },
    removeFeed: (state, action) => {
      return [];
    },
  },
});

export const { addFeed, removeUserFromFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
