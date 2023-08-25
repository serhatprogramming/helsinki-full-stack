import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    handleNotification(state, action) {
      return action.payload;
    },
  },
});

export const { handleNotification } = notificationSlice.actions;

export const notify = (message, duration) => {
  return async (dispatch) => {
    dispatch(handleNotification(message));
    setTimeout(() => {
      dispatch(handleNotification(""));
    }, duration);
  };
};

export default notificationSlice.reducer;
