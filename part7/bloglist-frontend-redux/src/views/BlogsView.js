import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogForm from "../components/BlogForm";
import Togglable from "../components/Togglable";
import { createBlogAction } from "../reducers/blogsReducer";
import { Link } from "react-router-dom";

const BlogsView = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  const handleCreateBlog = async ({ title, author, url }) => {
    dispatch(createBlogAction({ title, author, url, user }));
    blogFormRef.current.toggleVisibility();
  };

  const blogStyle = {
    padding: 10,
    border: "solid",
    borderWidth: 1,
    margin: "5px 0px",
  };

  return (
    <div>
      <Togglable buttonLabel="Create a New Blog" ref={blogFormRef}>
        <BlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Link to={`/blogs/${blog.id}`} key={blog.id} className="blog-link">
            <div className="blog-entry">{blog.title}</div>
          </Link>
        ))}
    </div>
  );
};

export default BlogsView;
