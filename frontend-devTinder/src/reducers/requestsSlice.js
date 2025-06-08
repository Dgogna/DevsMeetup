import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { addRequests } = requestsSlice.actions;
export default requestsSlice.reducer;
