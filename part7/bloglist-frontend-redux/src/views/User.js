import { useSelector } from "react-redux";
import { getBlogsForAUser } from "../utils/helperMethods";
import { useParams, Link } from "react-router-dom";

const User = () => {
  const id = useParams().id;
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return <></>;
  }

  return (
    <div className="user-added-blogs-container">
      <h2>{user.username}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {getBlogsForAUser(user.username, blogs).map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
