import React from "react";
import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "./reducers/notificationReducer";
import { fetchBlogs } from "./reducers/blogsReducer";
import {
  loginUser,
  logoutUser,
  localStorageUser,
} from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogsRedux = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    dispatch(fetchBlogs());
  }, []);

  useEffect(() => {
    dispatch(localStorageUser());
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(loginUser({ username, password }));
    setUsername("");
    setPassword("");
  };

  const handleCreateBlog = async ({ title, author, url }) => {
    try {
      blogService.setToken(user.token);
      const blog = await blogService.create({ title, author, url });
      blog.user = user;
      setBlogs([...blogs, blog]);
      blogFormRef.current.toggleVisibility();
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
      dispatch(notify(null));
    }, 5000);
  };

  const handleLike = async (id, likes) => {
    await blogService.update(id, {
      likes,
    });

    setBlogs(
      [...blogs].map((blog) => (blog.id === id ? { ...blog, likes } : blog))
    );
  };

  const handleDelete = async (id) => {
    try {
      blogService.setToken(user.token);
      await blogService.erase(id);
      dispatch(
        notify({
          message: "Delete successfull.",
          type: "info",
        })
      );
      setBlogs([...blogs].filter((blog) => blog.id !== id));
    } catch (error) {
      dispatch(
        notify({
          message: `${error.response.data.message}`,
          type: "error",
        })
      );
    }
    setTimeout(() => {
      dispatch(notify(null));
    }, 5000);
  };

  const showLogin = () => (
    <>
      <form onSubmit={handleLogin}>
        <h2>log in to application</h2>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            id="username-input"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            id="password-input"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );

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
      {user ? showBlogs() : showLogin()}
    </div>
  );
};

export default App;
