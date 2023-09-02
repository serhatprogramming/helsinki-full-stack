import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { notify, removeNotification } from "./notificationReducer";

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
    likeBlog: (state, action) => {
      return [...state].map((blog) =>
        blog.id === action.payload.id
          ? { ...blog, likes: action.payload.likes }
          : blog
      );
    },
    deleteBlog: (state, action) => {
      return [...state].filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { getBlogs, setBlogs, createBlog, likeBlog, deleteBlog } =
  blogSlice.actions;
export default blogSlice.reducer;

export const fetchBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const likeBlogAction = (id, likes) => {
  return async (dispatch) => {
    await blogService.update(id, { likes });
    dispatch(likeBlog({ id, likes }));
  };
};

export const deleteBlogAction = (id, user) => {
  return async (dispatch) => {
    try {
      blogService.setToken(user.token);
      await blogService.erase(id);
      dispatch(
        notify({
          message: "Delete successfull.",
          type: "info",
        })
      );
      dispatch(deleteBlog(id));
    } catch (error) {
      dispatch(
        notify({
          message: `${error.response.data.message}`,
          type: "error",
        })
      );
    }
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };
};

export const createBlogAction = ({ title, author, url, user }) => {
  return async (dispatch) => {
    try {
      blogService.setToken(user.token);
      const blog = await blogService.create({ title, author, url });
      blog.user = user;
      console.log("blog: ", blog);
      dispatch(createBlog(blog));
      dispatch(
        notify({
          message: `a new blog ${blog.title} by ${blog.author} added`,
          type: "info",
        })
      );
    } catch (error) {
      dispatch(
        notify({
          message: `${error.response.data.message}`,
          type: "error",
        })
      );
    }
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };
};
