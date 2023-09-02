import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    getBlogs: (state, action) => {
      return action.payload;
    },
    setBlogs: (state, action) => {
      return action.payload;
    },
    createBlog: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { getBlogs, setBlogs } = blogSlice.actions;
export default blogSlice.reducer;

export const fetchBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlogAction = (newBlog) => {
  return async (dispatch) => {
    const blog = await blogService.create(newBlog);
    dispatch(createBlog(newBlog));
  };
};
