import { useSelector } from "react-redux";
import { getBlogsForAUser } from "../utils/helperMethods";
import { useParams } from "react-router-dom";

const User = () => {
  const id = useParams().id;
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return <></>;
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {getBlogsForAUser(user.username, blogs).map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
