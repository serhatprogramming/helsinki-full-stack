import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import {
  createBlogAction,
  likeBlogAction,
  deleteBlogAction,
} from "../reducers/blogsReducer";
import { logoutUser } from "../reducers/loginReducer";
const BlogList = () => {
  const dispatch = useDispatch();
  const blogsRedux = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

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

  return (
    <div>
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
    </div>
  );
};

export default BlogList;
