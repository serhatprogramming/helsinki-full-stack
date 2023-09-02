import { useSelector } from "react-redux";
import { getNumberOfBlogs } from "../utils/helperMethods";
import { Link } from "react-router-dom";

const UserList = () => {
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  if (users.length === 0) {
    return <></>;
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/user/${user.id}`}>{user.name}</Link>
              </td>
              <td>{getNumberOfBlogs(user.username, blogs)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
