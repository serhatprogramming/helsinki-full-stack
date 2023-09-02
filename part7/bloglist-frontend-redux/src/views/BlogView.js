import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { likeBlogAction, deleteBlogAction } from "../reducers/blogsReducer";

const BlogView = () => {
  const id = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((blog) => blog.id === id);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!blog) {
    return null;
  }

  const handleLike = async () => {
    dispatch(likeBlogAction(blog.id, blog.likes + 1));
  };

  const handleDelete = async () => {
    dispatch(deleteBlogAction(id, user));
    navigate("/");
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url} target="_blank">
        {blog.url}
      </a>
      <div>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user.username}</div>
      <div>
        {blog.user.username === user.username && (
          <button onClick={handleDelete}>delete</button>
        )}
      </div>
      <h3>comments</h3>
      <ul>
        {blog.comments?.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogView;
