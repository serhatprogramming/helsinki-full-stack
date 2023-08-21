import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const handleLike = () => {
    blogService.update(blog.id, {
      likes: likes + 1,
    });
    setLikes(likes + 1);
  };

  const showWhenVisible = () => (
    <div>
      <div>{blog.url}</div>
      <div>
        likes {likes} <button onClick={handleLike}>like</button>
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
