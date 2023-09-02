import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "./reducers/blogsReducer";
import { localStorageUser } from "./reducers/loginReducer";
import UserList from "./components/UserList";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  useEffect(() => {
    dispatch(localStorageUser());
  }, []);

  return (
    <div>
      <Notification />
      {user ? <BlogList /> : <LoginForm />}
      <UserList />
    </div>
  );
};

export default App;
