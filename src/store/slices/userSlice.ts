import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwt: "",
  id: "",
  name: "",
  email: "",
  isAuthenticated: false,
  myCourses:[]
};

const alreadyLoggedInUser = localStorage.getItem("user");

const isLocallyAuth:boolean = typeof alreadyLoggedInUser === 'string' ? JSON.parse(alreadyLoggedInUser)?.isAuthenticated === 'true' : false

export const user = createSlice({
  name: "user",
  initialState:{...initialState, isAuthenticated: isLocallyAuth},
  reducers: {
    logout: () => initialState,
    login: (state, action) => {
      return { ...action.payload, isAuthenticated:true };
    },
  },
});

export const { login, logout } = user.actions;
export default user.reducer;