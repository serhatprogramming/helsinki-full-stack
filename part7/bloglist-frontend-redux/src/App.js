import React from "react";
import { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogs,
  createBlogAction,
  likeBlogAction,
  deleteBlogAction,
} from "./reducers/blogsReducer";
import { logoutUser, localStorageUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogsRedux = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  useEffect(() => {
    dispatch(localStorageUser());
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleCreateBlog = async ({ title, author, url }) => {
    dispatch(createBlogAction({ title, author, url, user }));
    blogFormRef.current.toggleVisibility();
  };

  const handleLike = async (id, likes) => {
    dispatch(likeBlogAction(id, likes));
  };

  const handleDelete = async (id) => {
    dispatch(deleteBlogAction(id, user));
  };

  const showBlogs = () => (
    <>
      <h2>blogs</h2>
      <p>
        {user.name} logged in. <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="create a new blog" ref={blogFormRef}>
        <BlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>

      {[...blogsRedux]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            username={user.username}
            handleDelete={handleDelete}
          />
        ))}
    </>
  );

  return (
    <div>
      <Notification />
      {user ? showBlogs() : <LoginForm />}
    </div>
  );
};

export default App;
