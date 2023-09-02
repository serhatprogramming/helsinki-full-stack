import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  likeBlogAction,
  deleteBlogAction,
  addCommentAction,
} from "../reducers/blogsReducer";

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

  const handleComment = async (event) => {
    event.preventDefault();
    dispatch(addCommentAction(blog.id, event.target.comment.value));
    event.target.comment.value = "";
  };

  return (
    <div className="single-blog-container">
      <h2>{blog.title}</h2>
      <a href={blog.url} target="_blank">
        {blog.url}
      </a>
      <div className="likes-section">
        {blog.likes} likes <button onClick={handleLike}>Like</button>
      </div>
      <div className="author-section">Added by {blog.user.username}</div>
      <div>
        {blog.user.username === user.username && (
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
      <h3>Comments</h3>
      <ul className="comments-list">
        {blog.comments?.map((comment, index) => (
          <li key={index} className="comment-item">
            {comment}
          </li>
        ))}
      </ul>
      <form onSubmit={handleComment} className="add-comment-form">
        <input type="text" name="comment" />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default BlogView;
