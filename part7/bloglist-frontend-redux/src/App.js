import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import User from "./views/User";
import UserList from "./views/UserList";
import BlogView from "./views/BlogView";
import MainMenu from "./components/MainMenu";
import BlogsView from "./views/BlogsView";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { fetchBlogs } from "./reducers/blogsReducer";
import { localStorageUser } from "./reducers/loginReducer";
import { fetchUsers } from "./reducers/usersReducer";

import "./styles.css";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  useEffect(() => {
    dispatch(localStorageUser());
  }, []);

  return (
    <Router>
      <Notification />
      {user && <MainMenu />}
      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/" element={user ? <BlogsView /> : <LoginForm />} />
        <Route path="/blogs/:id" element={<BlogView />} />
      </Routes>
    </Router>
  );
};

export default App;
