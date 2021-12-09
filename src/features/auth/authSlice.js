import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.user = undefined;
      state.token = undefined;
    },
  },
});

export const { setCredentials, logoutUser } = authSlice.actions;

export default authSlice.reducer;
