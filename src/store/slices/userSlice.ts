import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  email: "",
  isAuthenticated: false,
  myCourses: [],
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
    login: (_state, action) => {
      return { ...action.payload, isAuthenticated: true };
    },
    updateUser: (_state, action) => {
      return { ...action.payload };
    },
  },
});

export const { login, logout, updateUser } = user.actions;
export default user.reducer;
