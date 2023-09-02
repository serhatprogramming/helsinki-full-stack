import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const initialState = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    initializeUsers: (state, action) => {
      return action.payload;
    },
  },
});

export const { initializeUsers } = usersSlice.actions;
export default usersSlice.reducer;

export const fetchUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getUsers();
    dispatch(initializeUsers(users));
  };
};
