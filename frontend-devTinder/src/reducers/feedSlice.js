import { createSlice } from "@reduxjs/toolkit";

export const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => {
      // //console.log("commin in the action to add the feed of the user");
      // //console.log(action.payload);

      const feed = action.payload;
      if (feed) {
        // //console.log("Should come in this if condirion");
        state = action.payload;
        return state;
      }
    },
    removeFeed: (state, action) => {
      return [];
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
