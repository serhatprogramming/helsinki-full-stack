import { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = () => (
    <div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes} <button>like</button>
      </div>
      <div>{blog.user.username}</div>
    </div>
  );

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "view"}
      </button>
      {visible && showWhenVisible()}
    </div>
  );
};

export default Blog;
