import { logoutUser } from "../reducers/loginReducer";
import { useDispatch, useSelector } from "react-redux";

const UserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in. <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  );
};

export default UserInfo;
