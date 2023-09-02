import { logoutUser } from "../reducers/loginReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MainMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <div className="menu-container">
        <div className="menu-links">
          <div className="menu-item">
            <Link to={"/"} className="menu-link">
              blogs
            </Link>
          </div>
          <div className="menu-item">
            <Link to={"/users"} className="menu-link">
              users
            </Link>
          </div>
        </div>
        <div className="user-info">
          <span>{user.name} logged in.</span>
          <button className="logout-button" onClick={handleLogout}>
            logout
          </button>
        </div>
      </div>
      <h2>blog app</h2>
    </div>
  );
};

export default MainMenu;
