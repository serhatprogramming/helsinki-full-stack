import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { notify, removeNotification } from "./notificationReducer";

const initialState = null;

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      return action.payload;
    },
    logout: (state, action) => {
      return null;
    },
  },
});

const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      dispatch(login(user));
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(
        notify({
          message: `${user.name} has successfully logged in`,
          type: "info",
        })
      );
    } catch (error) {
      dispatch(notify({ message: "Wrong credentials", type: "error" }));
    }
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(logout());
  };
};

export const localStorageUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(login(user));
    }
  };
};
