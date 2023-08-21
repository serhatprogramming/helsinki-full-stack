import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const [user, setUser] = useState(null);

  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setNotificationMessage({
        message: `${user.name} has successfully logged in`,
        type: "info",
      });
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (exception) {
      setNotificationMessage({ message: "Wrong credentials", type: "error" });
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
    setUsername("");
    setPassword("");
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();

    const blog = await blogService.create({ title, author, url });
    setBlogs([...blogs, blog]);
    setTitle("");
    setAuthor("");
    setUrl("");
    setNotificationMessage({
      message: `a new blog ${blog.title} by ${blog.author} added`,
      type: "info",
    });
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const showBlogs = () => (
    <>
      <h2>blogs</h2>
      <p>
        {user.name} logged in. <button onClick={handleLogout}>logout</button>
      </p>
      {blogForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );

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
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );

  const blogForm = () => (
    <>
      <form onSubmit={handleCreateBlog}>
        <h2>create new</h2>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );

  return (
    <div>
      {notificationMessage && (
        <Notification notification={notificationMessage} />
      )}
      {user ? showBlogs() : showLogin()}
    </div>
  );
};

export default App;
